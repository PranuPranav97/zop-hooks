import { useState, useEffect } from "react";

function useScreenBrightness() {
  const [brightness, setBrightness] = useState<number | null>(null);

  useEffect(() => {
    function handleBrightness(event: any) {
      setBrightness(event.value);
    }

    window.addEventListener("devicelight", handleBrightness);

    return () => {
      window.removeEventListener("devicelight", handleBrightness);
    };
  }, []);

  return brightness;
}

export { useScreenBrightness };
