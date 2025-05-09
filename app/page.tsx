"use client";

export default function Home() {
  const handleSubmit = () => {
    // Validate that job description and CV file exist
    // If not, alert user
    // If valid, log values and navigate to interview page
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Welcome!</h1>
      <p className="text-lg text-gray-600 text-center">
        AI-Powered Interview Assistant
      </p>

      {/* Textarea for job description input */}
      {/* Input field for uploading CV (pdf, docx, txt) */}
      {/* Show selected file name if uploaded */}

      {/* Submit button to validate inputs and redirect to /interview */}
    </main>
  );
}
