"use client";

import { ScoreData } from "@/lib/types/score";

interface ScoreBreakdownProps {
  score: ScoreData;
  onRestart: () => void;
}

export default function ScoreBreakdown({ score, onRestart }: ScoreBreakdownProps) {
  return (
    <div className="w-full max-w-xl mt-8 bg-white border rounded-lg p-6 text-left shadow">
      <h2 className="text-xl font-bold mb-4 text-purple-700">Interview Score Breakdown</h2>
      <ul className="space-y-2">
        <li>
          <span className="font-semibold text-gray-800">Technical:</span>
          <span className="text-purple-900"> {score.technical}/10</span>
        </li>
        <li>
          <span className="font-semibold text-gray-800">Communication:</span>
          <span className="text-purple-900"> {score.communication}/10</span>
        </li>
        <li>
          <span className="font-semibold text-gray-800">Responsiveness:</span>
          <span className="text-purple-900"> {score.responsiveness}/10</span>
        </li>
        <li>
          <span className="font-semibold text-gray-800">Problem Solving:</span>
          <span className="text-purple-900"> {score.problemSolving}/10</span>
        </li>
        <li>
          <span className="font-semibold text-gray-800">Cultural Fit:</span>
          <span className="text-purple-900"> {score.culturalFit}/10</span>
        </li>
        <li className="font-bold text-purple-700 border-t pt-2 mt-2">
          Average Score: {score.averageScore.toFixed(2)}/10
        </li>
      </ul>
      <p className="mt-4 italic text-gray-700">📝 {score.summary}</p>
      <button
        onClick={onRestart}
        className="mt-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Restart Interview
      </button>
    </div>
  );
}