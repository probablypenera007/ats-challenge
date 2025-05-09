import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/mongodb/connect';
import InterviewSession from '@/models/interviewSession';


export async function POST(req: NextRequest) {
  try {
    const { jobDescription, cvText } = await req.json();
    await connectToDB();
    const saved = await InterviewSession.create({ jobDescription, cvText });
    return NextResponse.json({ success: true, sessionId: saved._id });
  } catch (err) {
    console.error('❌ Failed to save session:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}