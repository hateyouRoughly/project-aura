import { Job } from "@/types";
import { JobProcessor } from "@/lib/job/JobProcessor";
import dbConnect from "@/lib/db/mongoose";
import AutomationJob from "@/lib/db/models/AutomationJob";

export class AutomationFacade {
  private jobProcessor = new JobProcessor();

  async startJob(goal: string, url: string, userId: string): Promise<Job> {
    await dbConnect();

    const jobDoc = new AutomationJob({
      userId,
      userGoal: goal,
      startUrl: url,
    });
    await jobDoc.save();

    const job: Job = {
      id: jobDoc._id.toString(),
      goal,
      url,
      status: "pending",
      history: [],
    };

    this.jobProcessor.processJob(job);
    return job;
  }
}