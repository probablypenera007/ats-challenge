# Interview Scoring Breakdown

## Overview

After the interview concludes, the AI system evaluates the candidate's performance using a structured scoring rubric. It analyzes:

- The complete interview transcript  
- Response timing for each question  
- The original job description  
- The candidate’s CV  

The evaluation is triggered by a single AI prompt designed to output a strict JSON structure with category-wise scores and an overall summary.

---

## Scoring Categories

Each interview is evaluated on the following dimensions (scored from 0–10):

### 1. Technical Acumen
Evaluates the candidate's understanding of relevant technical concepts, tools, and frameworks required for the role.

### 2. Communication
Assesses the clarity, coherence, and professionalism of the candidate’s answers.

### 3. Responsiveness
Measures how quickly and appropriately the candidate responds. Slow or evasive answers may lead to a lower score.

### 4. Problem Solving
Judges the candidate’s ability to handle situational or follow-up questions, including structured reasoning and relevant examples.

### 5. Cultural Fit
Assesses interpersonal tone, values alignment, and the candidate's fit with the company's culture as inferred from the job description.

---

## Timing Metric: `avgResponseTime`

- Each response is timestamped and compared to the previous AI question.
- The **average response time (in seconds)** is calculated and included in the final output.
- It is used to:
  - Supplement the **Responsiveness** score  
  - Help reviewers understand how fast the candidate thinks/responds under mild time pressure  
- It is **not** directly scored but is returned for transparency.

---

## Final Output Format

The AI returns the following strict JSON format:

```json
{
  "technical": 7,
  "communication": 8,
  "responsiveness": 6,
  "problemSolving": 7,
  "culturalFit": 8,
  "averageScore": 7.2,
  "avgResponseTime": 5,
  "summary": "The candidate demonstrates strong communication and technical expertise, with room to improve responsiveness in high-pressure scenarios."
}