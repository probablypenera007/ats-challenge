type Props = {
    jobDescription: string;
    setJobDescription: (val: string) => void;
  };
  
  export default function JobDescriptionInput({ jobDescription, setJobDescription }: Props) {
    return (
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
    );
  }