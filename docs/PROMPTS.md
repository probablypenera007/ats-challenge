# Prompt Design Strategy

## Overview

The AI prompts in this project are crafted to guide the model in generating highly relevant and role-specific interview questions, and later to evaluate candidate performance based on both answer content and response timing.

### 1. Question Generation Prompt

When generating interview questions, the prompt combines:

The full Job Description provided by the recruiter

The parsed CV content of the candidate

### Example Prompt Structure:
You are an expert technical recruiter. Using the job description and the candidate’s CV below, generate a tailored interview question.

Job Description:
<job_description>

Candidate CV:
<cv_text>

Ask the first question to begin the interview.


The AI is instructed to contextualize questions based on the candidate’s background (extracted from the CV) and align them with the job requirements. The first generated question is used to start the interview.

Follow-up prompts include the previous Q&A pair to continue context-aware questioning.


### 2. Follow-up Question Prompt

After every user response:
You are conducting an interview. Based on the following Q&A, ask a logical follow-up question.

Previous Question: <previous_question>
Candidate's Answer: <answer>

Now, ask the next question.

This maintains conversation flow and dynamically adapts based on user input.




### 3. Scoring Prompt

After the interview ends, a transcript is compiled with timing metrics and passed to the AI with the job description and CV.

Example:
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
  "avgResponseTime": number,
  "summary": string
}

The candidate's average response time in seconds: <avg_response_time>

---

Job Description:
<job_description>

Candidate CV:
<cv_text>

Transcript:
<transcript>


This ensures consistent, machine-readable outputs suitable for analysis and UI display.

