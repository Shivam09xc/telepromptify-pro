// src/components/ScreenRecorderWithPrompt.jsx
import { usePrompt } from "../context/PromptContext";
import { useState, useRef, useEffect } from "react";

const ScreenRecorderWithPrompt = () => {
  const { script, scrollSpeed, fontSize } = usePrompt();
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const scrollRef = useRef();

  useEffect(() => {
    let animationId;

    const scroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop += scrollSpeed;
      }
      animationId = requestAnimationFrame(scroll);
    };

    if (scrollSpeed > 0) {
      animationId = requestAnimationFrame(scroll);
    }

    return () => cancelAnimationFrame(animationId);
  }, [scrollSpeed]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      recordedChunks.current = [];

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunks.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Webcam access error:", err);
      alert("⚠️ Could not access webcam. Please check your browser permissions.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">🎥 Record Script with Webcam Overlay</h2>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <div className="flex gap-4">
          {!recording ? (
            <button
              onClick={startRecording}
              className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md"
            >
              ⏺️ Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-4 py-2 rounded-lg font-semibold shadow-md"
            >
              ⏹️ Stop
            </button>
          )}
        </div>

        <video
          autoPlay
          muted
          className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover"
        >
          <track kind="captions" />
        </video>
      </div>

      <div
        ref={scrollRef}
        className="h-[30vh] md:h-[40vh] w-full overflow-y-scroll bg-white/5 p-4 rounded-md border border-white/10"
        style={{ fontSize: `${fontSize}px`, lineHeight: "1.6" }}
      >
        <div className="whitespace-pre-wrap text-white">
          {script || "📜 Type your script above to begin..."}
        </div>
      </div>

      {videoURL && (
        <div className="mt-4">
          <h3 className="text-md font-semibold mb-2">🎬 Preview / Download:</h3>
          <video src={videoURL} controls className="w-full mb-2 rounded-md" />
          <a
            href={videoURL}
            download="telepromptify-script-recording.webm"
            className="text-blue-400 underline hover:text-blue-600"
          >
            ⬇️ Download Recording
          </a>
        </div>
      )}
    </div>
  );
};

export default ScreenRecorderWithPrompt;
