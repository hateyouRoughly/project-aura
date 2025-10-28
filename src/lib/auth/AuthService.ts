'use server';

import dbConnect from '@/lib/db/mongoose';
import User from '@/lib/db/models/User';
import bcrypt from 'bcryptjs';
import { emailService } from '@/lib/common/EmailService';

export async function startRegistration(email: string, password: string): Promise<{ success: boolean; message: string }> {
  await dbConnect();

  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser.isVerified) {
    throw new Error('User already exists and is verified.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  if (existingUser) {
    existingUser.password = hashedPassword;
    existingUser.otp = otp;
    existingUser.otpExpires = otpExpires;
    await existingUser.save();
  } else {
    await User.create({
      email,
      password: hashedPassword,
      otp,
      otpExpires,
    });
  }

  await emailService.sendOtp(email, otp);
  return { success: true, message: 'OTP sent to your email.' };
}

export async function verifyRegistration(email: string, otp: string): Promise<{ success: boolean; message: string }> {
  await dbConnect();

  const user = await User.findOne({ email, otp }).select('+otp +otpExpires');

  if (!user) {
    throw new Error('Invalid OTP or email.');
  }

  if (user.otpExpires < new Date()) {
    throw new Error('OTP has expired.');
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  return { success: true, message: 'Email verified successfully.' };
}