// src/hooks/useStartDelay.js
import { useState, useEffect } from "react";

export const useStartDelay = (initialDelay = 3) => {
  const [countdown, setCountdown] = useState(initialDelay);
  const [delayActive, setDelayActive] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!delayActive) return;
    if (countdown <= 0) {
      setDelayActive(false);
      setReady(true);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [delayActive, countdown]);

  const startDelay = () => {
    setCountdown(initialDelay);
    setDelayActive(true);
    setReady(false);
  };

  return { countdown, delayActive, ready, startDelay };
};
