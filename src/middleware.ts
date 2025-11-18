import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import admin from '@/lib/firebase-admin'; // For verifying Firebase tokens
import jwt from 'jsonwebtoken'; // For verifying custom tokens

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/api/tasks')) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return new NextResponse(JSON.stringify({ message: 'Authentication failed: No token provided.' }), { status: 401, headers: { 'content-type': 'application/json' } });
  }

  let userId: string | null = null;

  try {
    // First, try to verify as a Firebase ID token
    const decodedFirebaseToken = await admin.auth().verifyIdToken(token);
    userId = decodedFirebaseToken.uid;
  } catch (firebaseError) {
    // If Firebase verification fails, try to verify as a custom JWT
    try {
      const decodedCustomToken = jwt.verify(token, process.env.JWT_SECRET!);
      // @ts-ignore
      userId = decodedCustomToken.id;
    } catch (customError) {
      // If both fail, return an error
      console.error('Token validation failed for both Firebase and custom JWT.');
      return new NextResponse(JSON.stringify({ message: 'Authentication failed: Invalid token.' }), { status: 401, headers: { 'content-type': 'application/json' } });
    }
  }

  if (!userId) {
    return new NextResponse(JSON.stringify({ message: 'Authentication failed: Could not determine user ID.' }), { status: 401, headers: { 'content-type': 'application/json' } });
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', userId);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: '/api/tasks/:path*',
  runtime: 'nodejs', // Keep this to ensure Node.js environment
};
