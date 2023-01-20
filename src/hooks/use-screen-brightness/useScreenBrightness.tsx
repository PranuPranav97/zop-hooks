import { useState, useEffect } from "react";

function useScreenBrightness() {
  const [brightness, setBrightness] = useState(0);

  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "screen-brightness" } as any)
        .then((result: PermissionStatus) => {
          if (result.state === "granted" || result.state === "prompt") {
            setBrightness(window.screen["brightness"]);
            window.addEventListener("devicelight", handleBrightness);
          }
        });
    }
    return () => {
      window.removeEventListener("devicelight", handleBrightness);
    };
  }, []);

  function handleBrightness(event: any) {
    setBrightness(event.value);
  }

  return brightness;
}

export { useScreenBrightness };
