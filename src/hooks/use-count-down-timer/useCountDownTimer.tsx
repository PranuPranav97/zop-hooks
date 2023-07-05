import { useState, useEffect } from "react";

interface CountdownTimerProps {
  duration: number;
}

const useCountdownTimer = ({ duration }: CountdownTimerProps) => {
  const [remainingTime, setRemainingTime] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        const newTime = prevTime - 1;
        return newTime >= 0 ? newTime : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  return { remainingTime, formattedTime };
};

export { useCountdownTimer };
