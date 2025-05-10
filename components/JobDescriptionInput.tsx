type Props = {
  jobDescription: string;
  setJobDescription: (val: string) => void;
};

export default function JobDescriptionInput({ jobDescription, setJobDescription }: Props) {
  return (
    <div className="w-full max-w-2xl text-left">
      <label className="block mb-2 text-base font-semibold text-gray-400">
        Job Description:
      </label>
      <textarea
        className="w-full border border-gray-300 rounded-xl p-4 text-base text-gray-800 shadow-sm focus:outline-none focus:ring-8 focus:ring-purple-400 focus:border-transparent transition"
        rows={6}
        placeholder="Paste job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
    </div>
  );
}