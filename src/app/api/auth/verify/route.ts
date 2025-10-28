import { NextResponse } from 'next/server';
import { verifyRegistration } from '@/lib/auth/AuthService';

export async function POST(request: Request) {
  const { email, otp } = await request.json();

  if (!email || !otp) {
    return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
  }

  try {
    const result = await verifyRegistration(email, otp);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
