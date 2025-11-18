import { WebSocket, WebSocketServer } from 'ws';
import { JobObserver } from "./JobObserver";

class WebSocketManager implements JobObserver {
  private static instance: WebSocketManager;
  private wss: WebSocketServer | null = null;
  private subscriptions = new Map<string, Set<WebSocket>>(); // Map<jobId, Set<client>>

  private constructor() {}

  public static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }
    return WebSocketManager.instance;
  }

  public setServer(wss: WebSocketServer): void {
    if (this.wss) return; // Prevent re-initialization
    
    this.wss = wss;
    this.wss.on('connection', (ws: WebSocket) => {
      console.log('Client connected');

      ws.on('message', (message: string) => {
        try {
          const data = JSON.parse(message);
          if (data.action === 'subscribe' && data.jobId) {
            this.subscribe(data.jobId, ws);
          }
        } catch (e) {
          console.error('Failed to parse incoming WebSocket message:', message);
        }
      });

      ws.on('close', () => {
        console.log('Client disconnected');
        // Clean up subscriptions on disconnect
        this.subscriptions.forEach((clients, jobId) => {
          if (clients.has(ws)) {
            clients.delete(ws);
          }
        });
      });
    });
  }

  private subscribe(jobId: string, ws: WebSocket) {
    if (!this.subscriptions.has(jobId)) {
      this.subscriptions.set(jobId, new Set());
    }
    this.subscriptions.get(jobId)!.add(ws);
    console.log(`Client subscribed to job ${jobId}`);
  }

  update(jobId: string, message: Message): void {
    const subscribers = this.subscriptions.get(jobId);
    if (subscribers) {
      const data = JSON.stringify(message); // Send the whole message object
      subscribers.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    }
  }
}

export const webSocketManager = WebSocketManager.getInstance();
