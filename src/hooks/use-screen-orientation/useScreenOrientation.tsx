import { useState, useEffect } from "react";

enum ScreenOrientation {
  PORTRAIT = "portrait",
  LANDSCAPE = "landscape",
}

function useScreenOrientation(): ScreenOrientation {
  const [orientation, setOrientation] = useState(
    window.screen.orientation.type.startsWith("portrait")
      ? ScreenOrientation.PORTRAIT
      : ScreenOrientation.LANDSCAPE
  );

  useEffect(() => {
    function handleOrientationChange() {
      setOrientation(
        window.screen.orientation.type.startsWith("portrait")
          ? ScreenOrientation.PORTRAIT
          : ScreenOrientation.LANDSCAPE
      );
    }

    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return orientation;
}

export { useScreenOrientation, ScreenOrientation };
