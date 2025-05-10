type Props = {
    onClick: () => void;
  };
  
  export default function SubmitButton({ onClick }: Props) {
    return (
      <button
        onClick={onClick}
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
      >
        Submit & Start Interview
      </button>
    );
  }