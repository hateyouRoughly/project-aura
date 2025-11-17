import { NextResponse } from 'next/server';
import { webSocketManager } from '@/lib/job/WebSocketManager';
import { WebSocketServer } from 'ws';

// This is a global variable to hold the WebSocket server instance
let wssInitialized = false;

export async function GET(request: Request) {
  // This is a workaround to get the underlying HTTP server
  // This may not be reliable in all environments
  // @ts-ignore
  const server = request.socket?.server || global.httpServer;

  if (server && !wssInitialized) {
    console.log('Setting up WebSocket server...');
    const wss = new WebSocketServer({ noServer: true });
    webSocketManager.setServer(wss);

    server.on('upgrade', (req: any, socket: any, head: any) => {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    });

    // Store the server instance globally for subsequent calls
    // @ts-ignore
    global.httpServer = server;
    wssInitialized = true;
  }

  // This endpoint doesn't return anything directly, 
  // it just sets up the WebSocket server.
  // The actual WebSocket connection is handled by the upgrade mechanism.
  return new NextResponse('WebSocket server is running.', { status: 200 });
}
