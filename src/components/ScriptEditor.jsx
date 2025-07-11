import { usePrompt } from '../context/PromptContext';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScriptTemplates from "./ScriptTemplates";
import jsPDF from "jspdf";
import ResetButton from "./ResetButton";



const handleExportPDF = () => {
  const doc = new jsPDF();
  const margin = 10;
  const lineHeight = 10;
  const maxLineWidth = 180;
  const lines = doc.splitTextToSize(script || "No script written.", maxLineWidth);
  
  doc.text(lines, margin, margin + lineHeight);
  doc.save("telepromptify-script.pdf");
};

const ScriptEditor = () => {
  const { script, setScript } = usePrompt();
  const boxRef = useRef();

 useEffect(() => {
  const el = boxRef.current;
  const ctx = gsap.context(() => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, el);
  return () => ctx.revert();
}, []);


  return (
    <div
      ref={boxRef}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-2xl"
    >
      <label className="block mb-2 text-lg font-semibold text-white">
        📝 Write or Paste Script
      </label>
      <textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        placeholder="Type your script here..."
        className="w-full h-40 p-4 rounded-md text-white bg-white/5 border border-white/20 outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
      />
      <ScriptTemplates />
      <button
  onClick={handleExportPDF}
  className="mt-2 px-4 py-1 bg-white/20 hover:bg-white/30 text-white text-sm rounded shadow"
>
  ⬇️ Export Script to PDF
</button>
<ResetButton />


    </div>
  );
};

export default ScriptEditor;
