import { NextResponse } from 'next/server';
import { AutomationFacade } from '@/lib/facade/AutomationFacade';
import { NextRequest } from 'next/server';
import dbConnect from '@/lib/db/mongoose';
import AutomationJob from '@/lib/db/models/AutomationJob';

const facade = new AutomationFacade();

export async function GET(request: NextRequest) {
  await dbConnect();
  const userId = request.headers.get('x-user-id');

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const jobs = await AutomationJob.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const userId = request.headers.get('x-user-id');
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { goal, url } = await request.json();

  if (!goal || !url) {
    return NextResponse.json({ error: 'Goal and URL are required' }, { status: 400 });
  }

  try {
    const job = await facade.startJob(goal, url, userId);
    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}
