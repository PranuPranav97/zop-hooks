import { useState, useEffect } from "react";

enum DeviceType {
  Android = "Android",
  WebOs = "webOS",
  Iphone = "iPhone",
  Ipad = "iPad",
  Ipod = "iPod",
  BlackBerry = "BlackBerry",
  WindowsPhone = "Windows Phone",
  Desktop = "Desktop",
}

function useDeviceType(): string {
  const [deviceType, setDeviceType] = useState<string>("");

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (userAgent.match(/Android/i)) {
      setDeviceType(DeviceType.Android);
    } else if (userAgent.match(/webOS/i)) {
      setDeviceType(DeviceType.WebOs);
    } else if (userAgent.match(/iPhone/i)) {
      setDeviceType(DeviceType.Iphone);
    } else if (userAgent.match(/iPad/i)) {
      setDeviceType(DeviceType.Ipad);
    } else if (userAgent.match(/iPod/i)) {
      setDeviceType(DeviceType.Ipod);
    } else if (userAgent.match(/BlackBerry/i)) {
      setDeviceType(DeviceType.BlackBerry);
    } else if (userAgent.match(/Windows Phone/i)) {
      setDeviceType(DeviceType.WindowsPhone);
    } else {
      setDeviceType(DeviceType.Desktop);
    }
  }, []);

  return deviceType;
}

export { useDeviceType, DeviceType };
