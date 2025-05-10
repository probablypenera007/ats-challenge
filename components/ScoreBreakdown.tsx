"use client";

import { ScoreData } from "@/lib/types/score";

interface ScoreBreakdownProps {
  score: ScoreData;
  onRestart: () => void;
}

export default function ScoreBreakdown({
  score,
  onRestart,
}: ScoreBreakdownProps) {
  const categories = [
    { label: "Technical", value: score.technical },
    { label: "Communication", value: score.communication },
    { label: "Responsiveness", value: score.responsiveness },
    { label: "Problem Solving", value: score.problemSolving },
    { label: "Cultural Fit", value: score.culturalFit },
  ];

  return (
    <div className="w-full max-w-2xl bg-white border border-purple-200 rounded-2xl p-8 shadow-lg text-left">
      <h2 className="text-2xl font-bold text-purple-700 mb-6">
        Interview Score Breakdown
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-50 border border-purple-100 rounded-lg px-4 py-3"
          >
            <span className="text-gray-800 font-medium">{cat.label}</span>
            <span className="text-purple-700 font-semibold">
              {cat.value}/10
            </span>
          </div>
        ))}
      </div>

      <div className="text-lg font-semibold text-purple-800 border-t border-purple-200 pt-4 mb-2">
        Average Score: {score.averageScore.toFixed(2)}/10
      </div>

      <div className="text-lg font-semibold text-purple-800  border-purple-200 pt--1 mb-2">
        Avg. Response Time: {score.avgResponseTime} seconds
      </div>

      <p className="mt-2 text-gray-600 leading-relaxed">{score.summary}</p>

      <div className="flex justify-center mt-6">
        <button
          onClick={onRestart}
          className="px-6 py-2 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition"
        >
          Restart Interview
        </button>
      </div>
    </div>
  );
}
