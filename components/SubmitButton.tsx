type Props = {
  onClick: () => void;
  isDisabled: boolean;
};

export default function SubmitButton({ onClick, isDisabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`px-12 py-6 rounded-2xl font-semibold transition ${
        isDisabled
          ? "bg-gray-300 text-gray-500"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
      }`}
    >
      Submit & Start Interview
    </button>
  );
}