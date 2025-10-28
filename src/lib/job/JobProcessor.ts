import { Job } from "@/types";
import { BrowserAgentFactory } from "@/lib/browser/BrowserAgentFactory";
import { AIRequestBuilder } from "@/lib/ai/AIRequestBuilder";
import { AIInterpreter } from "@/lib/ai/AIInterpreter";
import { ExecutionManager } from "@/lib/execution/ExecutionManager";
import { JobStatusNotifier } from "./JobStatusNotifier";
import { webSocketManager } from "./WebSocketManager";
import { GeminiStrategy } from "@/lib/ai/GeminiStrategy";
import dbConnect from "@/lib/db/mongoose";
import AutomationJob from "@/lib/db/models/AutomationJob";
import AuditLog from "@/lib/db/models/AuditLog";

export class JobProcessor {
  private factory = new BrowserAgentFactory();
  private builder = new AIRequestBuilder();
  private interpreter = new AIInterpreter(new GeminiStrategy());
  private executor = new ExecutionManager();
  private notifier = new JobStatusNotifier();

  constructor() {
    this.notifier.addObserver(webSocketManager);
  }

  async processJob(job: Job): Promise<void> {
    await dbConnect();
    const jobDoc = await AutomationJob.findById(job.id);
    if (!jobDoc) {
      console.error("Job not found in DB");
      return;
    }

    this.notifier.notify(job.id, "Starting job...");
    jobDoc.status = 'running';
    jobDoc.startedAt = new Date();
    await jobDoc.save();

    const agent = this.factory.createAgent();
    await agent.launch();
    await agent.navigate(job.url);

    try {
      let taskComplete = false;
      while (!taskComplete) {
        const state = await agent.captureState();
        const aiInput = this.builder.build(job.goal, state);
        const command = await this.interpreter.getCommand(aiInput, agent);

        if (command) {
          await this.executor.execute(command);
          const log = new AuditLog({
            jobId: job.id,
            actionType: command.constructor.name, // e.g., "ClickCommand"
            status: 'success',
          });
          await log.save();
          this.notifier.notify(job.id, `Executed action: ${log.actionType}`);
        } else {
          taskComplete = true;
          jobDoc.status = 'completed';
          this.notifier.notify(job.id, "Job completed.");
        }
      }
    } catch (error) {
      console.error(error);
      jobDoc.status = 'failed';
      this.notifier.notify(job.id, "Job failed.");
    } finally {
      await agent.close();
      jobDoc.completedAt = new Date();
      await jobDoc.save();
    }
  }
}