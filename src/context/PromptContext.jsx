import { createContext, useContext, useState, useEffect } from "react";

const PromptContext = createContext();

export const usePrompt = () => useContext(PromptContext);

export const PromptProvider = ({ children }) => {
  // ✅ Load script from localStorage on first render
  const [script, setScript] = useState(() => {
    return localStorage.getItem("prompt-script") || "";
  });

  // ✅ Save script to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("prompt-script", script);
  }, [script]);

  const [scrollSpeed, setScrollSpeed] = useState(1); // 1x
  const [fontSize, setFontSize] = useState(24); // px

  return (
    <PromptContext.Provider
      value={{
        script,
        setScript,
        scrollSpeed,
        setScrollSpeed,
        fontSize,
        setFontSize,
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};
