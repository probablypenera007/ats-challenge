import { openai } from "@/lib/openai/openai";
import { connectToDB } from "@/lib/mongodb/connect";
import InterviewSession from "@/models/interviewSession";

export async function getInterviewScore({ sessionId }: { sessionId: string }) {
  await connectToDB();
  const session = await InterviewSession.findById(sessionId);

  if (!session) {
    throw new Error("Session not found");
  }

  const { jobDescription, cvText, responses } = session;

  const transcript = responses
    .map(
      (r: any, i: number) =>
        `Q${i + 1}: ${r.question}\nA: ${r.answer}\nTime: ${r.responseTime}ms`
    )
    .join("\n\n");

    const prompt = `
    You are an expert AI interview evaluator. Your task is to analyze the following candidate's job interview and provide a brutally honest, professional evaluation.
    
    Based on the job description, the candidate's CV, and their full interview transcript with response timing, score the candidate from 0–10 in each of the following categories:
    - Technical Acumen
    - Communication
    - Responsiveness
    - Problem Solving
    - Cultural Fit
    
    Then, calculate an overall average score and provide a concise, no-fluff summary. This summary should clearly state:
    - What the candidate's top strengths are
    - Where they are weakest or may need improvement
    - Whether they are a strong fit, a borderline fit, or not a fit at all for the role
    
    Output the result in strict JSON format only:
    {
      "technical": number,
      "communication": number,
      "responsiveness": number,
      "problemSolving": number,
      "culturalFit": number,
      "averageScore": number,
      "summary": string
    }
    
    ---
    
    Job Description:
    ${jobDescription}
    
    Candidate CV:
    ${cvText.slice(0, 3000)}
    
    Transcript:
    ${transcript}
    `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  const jsonResponse = completion.choices[0]?.message?.content;
  //   const parsed = JSON.parse(jsonResponse || "{}");
  const cleaned = (jsonResponse || "")
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const parsed = JSON.parse(cleaned);

  return parsed;
}