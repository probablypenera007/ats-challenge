import { NextResponse } from "next/server";
import { getInterviewScore } from "@/lib/openai/getInterviewScore";
import { connectToDB } from "@/lib/mongodb/connect";
import InterviewSession from "@/models/interviewSession";

export async function POST(req: Request) {
  const { sessionId } = await req.json();

  if (!sessionId) {
    return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
  }

  try {
    const score = await getInterviewScore({ sessionId });

    await connectToDB();
    const session = await InterviewSession.findById(sessionId);
    if (!session) return NextResponse.json({ error: "Session not found" }, { status: 404 });

    session.score = score;
    session.endedAt = new Date();
    await session.save();

    return NextResponse.json({ score });
  } catch (err: any) {
    console.error("❌ Scoring error:", err);
    return NextResponse.json({ error: "Failed to score interview" }, { status: 500 });
  }
}