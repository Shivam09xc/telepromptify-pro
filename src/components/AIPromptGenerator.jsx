// src/components/AIPromptGenerator.jsx
import { useState } from "react";
import { usePrompt } from "../context/PromptContext";

const AIPromptGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const { setScript } = usePrompt();

  const generateScript = async () => {
    if (!topic.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(
  "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyAKp2dUJ23L5WCRI5w3gR6ptEe4Bmx86IA",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `Generate a professional and engaging script about: ${topic}`
            }
          ]
        }
      ]
    })
  }
);


      if (!res.ok) {
        throw new Error(`Gemini API error: ${res.status}`);
      }

      const data = await res.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ Failed to generate script.";
      setScript(reply);
    } catch (err) {
      console.error("Gemini AI Error:", err);
      setScript("⚠️ Error connecting to Gemini API.");
    }

    setLoading(false);
  };

  return (
    <div className="mt-6 bg-white/10 p-4 rounded-lg">
      <h3 className="text-md font-semibold mb-2 text-white">🤖 Generate Script with Gemini AI</h3>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Enter topic (e.g., Self Intro, Product Demo)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex-1 px-3 py-2 rounded bg-white/20 text-white placeholder-gray-300 focus:outline-none"
        />
        <button
          onClick={generateScript}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
    </div>
  );
};

export default AIPromptGenerator;
