import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const ScreenRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const webcamPreviewRef = useRef(null);
  const recorderRef = useRef();
  const webcamStreamRef = useRef(null);

  useEffect(() => {
    const el = recorderRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }, el);

    const setupWebcam = async () => {
      try {
        const webcamStream = await navigator.mediaDevices.getUserMedia({ video: true });
        webcamStreamRef.current = webcamStream;
        if (webcamPreviewRef.current) {
          webcamPreviewRef.current.srcObject = webcamStream;
        }
      } catch (err) {
        console.error("Webcam access denied:", err);
      }
    };

    setupWebcam();

    return () => ctx.revert();
  }, []);

  const startRecording = () => {
    if (!webcamStreamRef.current) return;

    recordedChunks.current = [];

    const mediaRecorder = new MediaRecorder(webcamStreamRef.current);
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
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div ref={recorderRef} className="mt-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 text-white">
      <h2 className="text-xl font-semibold mb-4">📷 Webcam Recorder Only</h2>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-4">
          {!recording ? (
            <button
              onClick={startRecording}
              className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition"
            >
              🎬 Start Webcam
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition"
            >
              ⏹️ Stop
            </button>
          )}
        </div>

        <video
          ref={webcamPreviewRef}
          autoPlay
          muted
          className="w-24 h-24 rounded-full border-4 border-white object-cover"
        />
      </div>

      {videoURL && (
        <div className="mt-4">
          <h3 className="text-md font-semibold mb-2">🎥 Preview / Download:</h3>
          <video src={videoURL} controls className="w-full mb-2 rounded-md" />
          <a
            href={videoURL}
            download="webcam-recording.webm"
            className="text-blue-400 underline hover:text-blue-600"
          >
            ⬇️ Download Recording
          </a>
        </div>
      )}
    </div>
  );
};

export default ScreenRecorder;
