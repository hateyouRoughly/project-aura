import { NextResponse } from 'next/server';
import { AutomationFacade } from '@/lib/facade/AutomationFacade';
import { NextRequest } from 'next/server';

const facade = new AutomationFacade();

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
