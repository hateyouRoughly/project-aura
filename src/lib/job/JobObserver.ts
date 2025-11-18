import { Message } from "./JobStatusNotifier";

export interface JobObserver {
  update(jobId: string, message: Message): void;
}
