import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb/connect";
import InterviewSession from "@/models/interviewSession";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const jobDescription = form.get("jobDescription")?.toString() || "";
    const file = form.get("cvFile") as File;

    // Optional: read file text content (example for .txt files)
    const buffer = file ? Buffer.from(await file.arrayBuffer()) : null;
    const cvText = buffer?.toString("utf-8") || "";

    await connectToDB();
    const saved = await InterviewSession.create({ jobDescription, cvText });

    return NextResponse.json({ success: true, sessionId: saved._id });
  } catch (err) {
    console.error("❌ Failed to save session:", err instanceof Error ? err.stack : err);
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}