import { useEffect, useRef } from "react";
import { KeyCombination, ShortcutCallback } from "../../types/useShortcuts";

export const useShortcuts = (
  keys: KeyCombination,
  callback: ShortcutCallback
) => {
  const pressedKeys = useRef<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Add the current key to the Set
      pressedKeys.current.add(event.key.toLowerCase());

      // Check if all keys in the combination are currently pressed
      const isMatch = keys.every((key) =>
        pressedKeys.current.has(key.toLowerCase())
      );

      if (isMatch) {
        event.preventDefault();
        callback();
        // Clear pressed keys after triggering the callback
        pressedKeys.current.clear();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      // Remove the released key from the Set
      pressedKeys.current.delete(event.key.toLowerCase());
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      pressedKeys.current.clear();
    };
  }, [keys, callback]);

  return null;
};
