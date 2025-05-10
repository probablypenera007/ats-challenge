"use client";

import { UploadCloud } from "lucide-react";

type Props = {
  cvFile: File | null;
  setCvFile: (file: File | null) => void;
};

export default function CVUploader({ cvFile, setCvFile }: Props) {
  const handleClick = () => {
    document.getElementById("cv-upload-input")?.click();
  };

  return (
    <div className="w-full max-w-md text-left">
      <div
        onClick={handleClick}
        className={`flex flex-col items-center justify-center gap-1 w-full h-40 border-4 border-dashed rounded-xl cursor-pointer transition ${
          cvFile
            ? "bg-purple-200 border-purple-500 text-purple-800"
            : "bg-purple-50 border-purple-400 text-purple-700 hover:bg-purple-100"
        }`}
      >
        <UploadCloud className="w-10 h-10" />
        <p className="text-md font-medium">Click to Upload Your CV</p>
        {cvFile && (
          <p className="text-s text-gray-700 italic truncate max-w-[90%] text-center">
            Selected: {cvFile.name}
          </p>
        )}
      </div>

      <input
        id="cv-upload-input"
        type="file"
        accept=".pdf,.docx,.txt,.text"
        onChange={(e) => setCvFile(e.target.files?.[0] || null)}
        className="hidden"
      />
    </div>
  );
}