import { NextResponse } from "next/server";
import { openai } from "@/lib/openai/openai";
import { connectToDB } from "@/lib/mongodb/connect";
import InterviewSession from "@/models/interviewSession";
import { getInterviewScore } from "@/lib/openai/getInterviewScore";

interface SessionData {
  jobDescription: string;
  cvText: string;
  responses: any[];
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, question, answer, responseTime } = body;

    if (!sessionId || !question || !answer || responseTime == null) {
      return NextResponse.json(
        { error: "Missing input data" },
        { status: 400 }
      );
    }

    await connectToDB();

    // ⏺️ Record response
    await InterviewSession.findByIdAndUpdate(sessionId, {
      $push: {
        responses: {
          question,
          answer,
          responseTime: Math.round(responseTime / 1000),
        },
      },
    });

    // Fetch updated session with responses
    const session = await InterviewSession.findById(
      sessionId
    ).lean<SessionData>();
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Prompt for next follow-up
    const prompt = `You are conducting an interview based on the following job description and CV. The candidate just answered a question. Based on that, ask the next follow-up question.

Job Description:
${session.jobDescription}

CV:
${session.cvText}

Previous Q: ${question}
Candidate's Answer: ${answer}

Now, ask a logical follow-up question.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    const followUp = completion.choices[0]?.message?.content?.trim() || "";

    // ✅ Auto-end logic
    if (
      followUp.toLowerCase().includes("this concludes the interview") ||
      (session.responses?.length || 0) + 1 >= 15
    ) {
      const score = await getInterviewScore({ sessionId });
      await InterviewSession.findByIdAndUpdate(sessionId, {
        endedAt: new Date(),
        score,
      });

      return NextResponse.json({
        followUp: "This concludes the interview. Thank you for your time!",
        done: true,
      });
    }

    return NextResponse.json({ followUp });
  } catch (err) {
    console.error("❌ Ask-question error:", err);
    return NextResponse.json(
      { error: "Failed to handle question" },
      { status: 500 }
    );
  }
}
