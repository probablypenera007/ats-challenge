import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb/connect";
import InterviewSession from "@/models/interviewSession";

// Define the shape explicitly
interface InterviewSessionType {
  jobDescription: string;
  cvText: string;
  _id: string;
  __v: number;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing session ID" }, { status: 400 });
  }

  try {
    await connectToDB();
    const session = await InterviewSession.findById(id).lean<InterviewSessionType>();

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    console.log("📦 Retrieved Interview Session:", {
        jobDescriptionPreview: session.jobDescription.slice(0, 100),
        cvTextPreview: session.cvText.slice(0, 100),
      });

    return NextResponse.json({
      jobDescription: session.jobDescription,
      cvText: session.cvText,
    });
  } catch (error) {
    console.error("❌ DB fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 });
  }
}