import { WebSocket, WebSocketServer } from 'ws';
import { JobObserver } from "./JobObserver";

class WebSocketManager implements JobObserver {
  private static instance: WebSocketManager;
  private wss: WebSocketServer | null = null;

  private constructor() {}

  public static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }
    return WebSocketManager.instance;
  }

  public setServer(wss: WebSocketServer): void {
    if (!this.wss) {
      this.wss = wss;
      this.wss.on('connection', (ws: WebSocket) => {
        console.log('Client connected');
        ws.on('close', () => console.log('Client disconnected'));
      });
    }
  }

  update(jobId: string, message: string): void {
    if (this.wss) {
      const data = JSON.stringify({ jobId, message });
      this.wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    }
  }
}

export const webSocketManager = WebSocketManager.getInstance();
