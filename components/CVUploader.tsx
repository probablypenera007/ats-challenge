type Props = {
    cvFile: File | null;
    setCvFile: (file: File | null) => void;
  };
  
  export default function CVUploader({ cvFile, setCvFile }: Props) {
    return (
      <div className="w-full max-w-md">
        <label className="block mb-2 font-medium">Upload Candidate CV</label>
        <input
          type="file"
          accept=".pdf,.docx,.txt,.text"
          onChange={(e) => setCvFile(e.target.files?.[0] || null)}
        />
        {cvFile && (
          <p className="mt-2 text-sm text-gray-600">Selected: {cvFile.name}</p>
        )}
      </div>
    );
  }