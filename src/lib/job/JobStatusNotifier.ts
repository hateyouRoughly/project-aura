import { JobObserver } from "./JobObserver";

export class JobStatusNotifier {
  private observers: JobObserver[] = [];

  addObserver(observer: JobObserver): void {
    this.observers.push(observer);
  }

  removeObserver(observer: JobObserver): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(jobId: string, message: string): void {
    for (const observer of this.observers) {
      observer.update(jobId, message);
    }
  }
}
