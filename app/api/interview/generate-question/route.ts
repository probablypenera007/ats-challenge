import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai/openai";

export async function POST(req: NextRequest) {
  try {
    const { jobDescription, cvText } = await req.json();

    if (!jobDescription || !cvText) {
      return NextResponse.json({ error: "Missing jobDescription or cvText" }, { status: 400 });
    }

    const prompt = `You are an expert recruiter AI. Based on the following job description and resume, ask the first interview question. Make sure it's relevant and insightful.

Job Description:
${jobDescription}

Resume:
${cvText}

Begin with the first question only.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an expert recruiter AI conducting interviews." },
        { role: "user", content: prompt },
      ],
    });

    const question = completion.choices[0]?.message?.content?.trim() || "Let's begin. Tell me about yourself.";

    return NextResponse.json({ question });
  } catch (err) {
    console.error("❌ generate-question error:", err);
    return NextResponse.json({ error: "Failed to generate question" }, { status: 500 });
  }
}