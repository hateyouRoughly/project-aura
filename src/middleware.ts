import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (request.nextUrl.pathname.startsWith('/api/tasks')) {
    if (!token) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Authentication failed: No token provided.' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      const requestHeaders = new Headers(request.headers);
      // @ts-ignore
      requestHeaders.set('x-user-id', decoded.id);
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Authentication failed: Invalid token.' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/tasks/:path*',
  runtime: 'nodejs',
};
