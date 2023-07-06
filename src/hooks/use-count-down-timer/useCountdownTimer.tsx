import { useState, useEffect, useCallback } from "react";

interface CountdownTimerProps {
  duration: number;
  dependencies?: any[];
}

const useCountdownTimer = ({ duration, dependencies }: CountdownTimerProps) => {
  const [remainingTime, setRemainingTime] = useState(duration);

  useEffect(() => {
    setRemainingTime(duration);
  }, [duration, ...(dependencies || [])]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        const newTime = prevTime - 1;
        return newTime >= 0 ? newTime : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedHours =
      hours > 0 ? `${hours.toString().padStart(2, "0")}:` : "";

    return `${formattedHours}${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const formattedTime = formatTime(remainingTime);

  const restartTimer = useCallback(() => {
    setRemainingTime(duration);
  }, [duration]);

  return { remainingTime, formattedTime, restartTimer };
};

export { useCountdownTimer };
