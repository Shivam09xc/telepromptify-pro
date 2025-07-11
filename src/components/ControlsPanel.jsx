import { usePrompt } from "../context/PromptContext";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const ControlsPanel = () => {
  const {
    scrollSpeed,
    setScrollSpeed,
    fontSize,
    setFontSize,
  } = usePrompt();

  const controlsRef = useRef();

  useEffect(() => {
  const el = controlsRef.current;
  const ctx = gsap.context(() => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, el);
  return () => ctx.revert();
}, []);


  return (
    <div
      ref={controlsRef}
      className="mt-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 text-white"
    >
      <h2 className="text-xl font-semibold mb-4">🎛 Prompt Controls</h2>

      {/* Scroll Speed */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Scroll Speed: <span className="text-blue-400">{scrollSpeed}x</span>
        </label>
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={scrollSpeed}
          onChange={(e) => setScrollSpeed(parseFloat(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500"
        />
      </div>

      {/* Font Size */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Font Size: <span className="text-blue-400">{fontSize}px</span>
        </label>
        <input
          type="range"
          min="16"
          max="48"
          step="1"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-green-400 to-teal-500"
        />
      </div>
    </div>
  );
};

export default ControlsPanel;
