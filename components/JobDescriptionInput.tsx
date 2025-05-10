"use client";

import { useState } from "react";

type Props = {
  jobDescription: string;
  setJobDescription: (val: string) => void;
};

export default function JobDescriptionInput({
  jobDescription,
  setJobDescription,
}: Props) {
  const [touched, setTouched] = useState(false);
  const minLength = 100;

  const isTooShort = jobDescription.trim().length < minLength && touched;

  return (
    <div className="w-full max-w-2xl text-left">
      <label className="block mb-2 text-base font-semibold text-gray-400">
        Job Description:
      </label>
      <textarea
        className={`w-full border ${
          isTooShort ? "border-red-400" : "border-gray-300"
        } rounded-xl p-4 text-base text-gray-800 shadow-sm focus:outline-none focus:ring-8 focus:ring-purple-400 focus:border-transparent transition`}
        rows={6}
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={(e) => {
          setJobDescription(e.target.value);
          if (!touched) setTouched(true);
        }}
        onBlur={() => setTouched(true)}
      />
      {isTooShort && (
        <p className="mt-1 text-sm text-red-500">
          Job description must be at least {minLength} characters.
        </p>
      )}
    </div>
  );
}