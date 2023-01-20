import { useState, useEffect } from "react";

function useKeyPress(targetKey: any) {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: any) {
      if (e.key === targetKey) {
        setKeyPressed(true);
      }
    }

    function handleKeyUp(e: any) {
      if (e.key === targetKey) {
        setKeyPressed(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [targetKey]);

  return keyPressed;
}

export { useKeyPress };
