import { useEffect, useState } from "react";

type TimerState = "idle" | "running" | "paused";

interface Timer {
  time: number;
  state: TimerState;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

const useTimer = (initialTime = 0): Timer => {
  const [time, setTime] = useState<number>(initialTime);
  const [state, setState] = useState<TimerState>("idle");
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (state === "running") {
      setTimerId(
        setInterval(() => {
          setTime((prevTime) => prevTime + 1);
        }, 1000)
      );
    } else if (state === "paused" || state === "idle") {
      if (timerId) {
        clearInterval(timerId);
        setTimerId(null);
      }
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [state]);

  const start = (): void => {
    setState("running");
  };

  const pause = (): void => {
    setState("paused");
  };

  const reset = (): void => {
    setTime(initialTime);
    setState("idle");
  };

  return {
    time,
    state,
    start,
    pause,
    reset,
  };
};

export default useTimer;
