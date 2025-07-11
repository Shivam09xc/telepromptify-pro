// src/components/ScriptTemplates.jsx
import { usePrompt } from "../context/PromptContext";

const templates = [
  {
    title: "Self Introduction",
    content: `Hi, my name is Shivam Soni. I'm a final-year B.Tech student specializing in Electronics and Communication Engineering. I enjoy building AI-integrated full-stack web apps using MERN stack and OpenAI tools.`,
  },
  {
    title: "YouTube Outro",
    content: `Thanks for watching! If you enjoyed this video, don’t forget to like, comment, and subscribe for more awesome content.`,
  },
  {
    title: "Tech Demo",
    content: `Today, I’m going to demonstrate how our AI-driven tool streamlines script-based video creation by combining teleprompting, screen recording, and mic input in one platform.`,
  },
];

const ScriptTemplates = () => {
  const { setScript } = usePrompt();

  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 mb-1">💡 Load a Template</h3>
      <div className="flex flex-wrap gap-2">
        {templates.map((tpl, i) => (
          <button
            key={i}
            onClick={() => setScript(tpl.content)}
            className="bg-white/20 hover:bg-white/30 text-sm px-3 py-1 rounded text-white shadow"
          >
            {tpl.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScriptTemplates;
