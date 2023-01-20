import { useState, useEffect } from "react";

//TODO device type enum

function useDeviceType(): string {
  const [deviceType, setDeviceType] = useState<string>("");

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (userAgent.match(/Android/i)) {
      setDeviceType("Android");
    } else if (userAgent.match(/webOS/i)) {
      setDeviceType("webOS");
    } else if (userAgent.match(/iPhone/i)) {
      setDeviceType("iPhone");
    } else if (userAgent.match(/iPad/i)) {
      setDeviceType("iPad");
    } else if (userAgent.match(/iPod/i)) {
      setDeviceType("iPod");
    } else if (userAgent.match(/BlackBerry/i)) {
      setDeviceType("BlackBerry");
    } else if (userAgent.match(/Windows Phone/i)) {
      setDeviceType("Windows Phone");
    } else {
      setDeviceType("Desktop");
    }
  }, []);

  return deviceType;
}

export { useDeviceType };
