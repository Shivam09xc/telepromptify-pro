import { useEffect, useRef } from "react";
import { usePrompt } from "../context/PromptContext";
import gsap from "gsap";

const PrompterScreen = () => {
  const { script, scrollSpeed, fontSize } = usePrompt();
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
  const el = containerRef.current;
  const ctx = gsap.context(() => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, el);
  return () => ctx.revert();
}, []);


  useEffect(() => {
    let animationId;

    const scroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop += scrollSpeed;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [scrollSpeed]);

  return (
    <div
      ref={containerRef}
      className="h-[28rem] bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 overflow-hidden"
    >
      <div
        ref={scrollRef}
        className="h-full overflow-y-scroll px-2 pr-4 custom-scrollbar"
        style={{ fontSize: `${fontSize}px`, lineHeight: "1.6" }}
      >
        <div className="whitespace-pre-wrap text-white">
          {script || "📜 Your script will scroll here... Start typing!"}
        </div>
      </div>
    </div>
  );
};

export default PrompterScreen;
