export interface JobObserver {
  update(jobId: string, message: string): void;
}
