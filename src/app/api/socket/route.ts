// src/app/api/socket/route.ts
import { NextResponse } from 'next/server';
import { WebSocketServer } from 'ws';
import { webSocketManager } from '@/lib/job/WebSocketManager';

function setupWebSocket(server: any) {
    const wss = new WebSocketServer({ noServer: true });
    webSocketManager.setServer(wss);

    server.on('upgrade', (req: any, socket: any, head: any) => {
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit('connection', ws, req);
        });
    });
    console.log("WebSocket server upgrade handler configured.");
}

export async function GET(request: Request) {
    // This is a workaround to get the underlying HTTP server in Next.js
    // @ts-ignore
    const server = request.socket?.server || (global as any).httpServer;

    if (server && !(global as any).webSocketServerInitialized) {
        console.log("Initializing WebSocket server...");
        setupWebSocket(server);
        (global as any).webSocketServerInitialized = true;
        if (!(global as any).httpServer) {
            (global as any).httpServer = server;
        }
    }
    
    return new NextResponse('Socket endpoint is active.', { status: 200 });
}
