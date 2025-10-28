import { JobObserver } from "./JobObserver";

class WebSocketManager implements JobObserver {
  private static instance: WebSocketManager;

  private constructor() {}

  public static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }
    return WebSocketManager.instance;
  }

  update(jobId: string, message: string): void {
    console.log(`[WebSocket] Job ${jobId}: ${message}`);
    // In a real implementation, this would send a message over a WebSocket.
  }
}

export const webSocketManager = WebSocketManager.getInstance();
