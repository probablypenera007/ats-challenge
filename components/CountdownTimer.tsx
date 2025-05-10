"use client";
import { useEffect } from "react";

export interface CountdownTimerProps {
  countdown: number;
  setCountdown: (value: number | null) => void;
  onFinish: () => void;
}

const CountdownTimer = ({ countdown, setCountdown, onFinish }: CountdownTimerProps) => {
  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setCountdown(null);
      onFinish();
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, setCountdown, onFinish]);

  return (
    <div className="text-6xl font-bold text-purple-600 animate-pulse my-8">
      {countdown}
    </div>
  );
};

export default CountdownTimer;