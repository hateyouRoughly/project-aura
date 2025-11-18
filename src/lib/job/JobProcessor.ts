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

    let agent: any = null;

    try {
      this.notifier.notify(job.id, { type: 'log', content: "Starting job..." });
      jobDoc.status = 'running';
      jobDoc.startedAt = new Date();
      await jobDoc.save();

      agent = this.factory.createAgent();
      await agent.launch();
      this.notifier.notify(job.id, { type: 'log', content: `Navigating to ${job.url}` });
      await agent.navigate(job.url);

      let taskComplete = false;
      while (!taskComplete) {
        this.notifier.notify(job.id, { type: 'thought', content: "Capturing page state..." });
        const state = await agent.captureState();
        
        this.notifier.notify(job.id, { type: 'thought', content: "Interpreting state and deciding next action..." });
        const aiInput = this.builder.build(job.goal, state);
        const command = await this.interpreter.getCommand(aiInput, agent);

        if (command) {
          const commandParams = command.getParameters();
          this.notifier.notify(job.id, { type: 'action', content: `Executing: ${command.constructor.name} on selector '${commandParams.selector}'` });
          await this.executor.execute(command);
          const log = new AuditLog({
            jobId: job.id,
            actionType: command.constructor.name,
            details: commandParams,
            status: 'success',
          });
          await log.save();
        } else {
          taskComplete = true;
          jobDoc.status = 'completed';
          this.notifier.notify(job.id, { type: 'log', content: "Job completed successfully." });
        }
      }
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.message || 'An unknown error occurred.';
      if (jobDoc) {
        jobDoc.status = 'failed';
        this.notifier.notify(job.id, { type: 'error', content: `Job failed: ${errorMessage}` });
      }
    } finally {
      if (agent) {
        await agent.close();
      }
      if (jobDoc) {
        jobDoc.completedAt = new Date();
        await jobDoc.save();
      }
    }
  }
}