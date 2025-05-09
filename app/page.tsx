"use client";

import { useState } from 'react';

export default function Home() {
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = () => {
    // Validate that job description and CV file exist
    // If not, alert user
    // If valid, log values and navigate to interview page
    if (!jobDescription) {
      alert("Please enter a job description.");
      return;
    }

     console.log('Job Description:', jobDescription);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Welcome!</h1>
      <p className="text-lg text-gray-600 text-center">
        AI-Powered Interview Assistant
      </p>

      <p className="text-center text-gray-500 max-w-xl">
        Paste the job description and upload your CV to generate personalized
        interview questions. This helps the AI interviewer position you better
        and tailor the interview to your background.
      </p>

      <div className="w-full max-w-md">
        <label className="block mb-2 font-medium">Job Description</label>
        <textarea
          className="w-full border border-gray-300 rounded p-2 text-black"
          rows={6}
          placeholder="Paste job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      {/* Input field for uploading CV (pdf, docx, txt) */}
      {/* Show selected file name if uploaded */}

      {/* Submit button to validate inputs and redirect to /interview */}
      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
      >
        Submit & Start Interview
      </button>
    </main>
  );
}
