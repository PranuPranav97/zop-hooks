import { useState, useEffect } from "react";

function usePageTimer(): number {
  const [timeSpent, setTimeSpent] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return timeSpent;
}

export { usePageTimer };
