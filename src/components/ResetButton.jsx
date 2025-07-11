// src/components/ResetButton.jsx
import { usePrompt } from "../context/PromptContext";

const ResetButton = () => {
  const { setScript, setScrollSpeed, setFontSize } = usePrompt();

  const handleReset = () => {
    if (confirm("⚠️ Are you sure you want to reset everything?")) {
      localStorage.removeItem("prompt-script");
      setScript("");
      setScrollSpeed(1);
      setFontSize(24);
    }
  };

  return (
    <button
      onClick={handleReset}
      className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded shadow"
    >
      ♻️ Reset All
    </button>
  );
};

export default ResetButton;
