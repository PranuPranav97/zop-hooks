import { useEffect, useRef } from "react";
import { KeyCombination, ShortcutCallback } from "../../types/useShortcuts";

const useShortcuts = (keys: KeyCombination, callback: ShortcutCallback) => {
  // Use a Set to track keys currently pressed
  const pressedKeys = useRef(new Set<string>());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Add the pressed key to the Set
      pressedKeys.current.add(event.key.toLowerCase());

      // Check if all specified keys are pressed
      const isMatch = keys.every((key) =>
        pressedKeys.current.has(key.toLowerCase())
      );

      if (isMatch) {
        event.preventDefault();
        callback();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      // Remove the released key from the Set
      pressedKeys.current.delete(event.key.toLowerCase());
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [keys, callback]);

  return null;
};

export { useShortcuts as useShortcut };
