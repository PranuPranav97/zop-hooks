import { useState, useEffect } from "react";
import { Geolocation } from "../../types/useGeoLocation";

function useGeolocation(): Geolocation | undefined {
  const [geolocation, setGeolocation] = useState<Geolocation | undefined>();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          });
        },
        (error) => {
          console.error(error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return geolocation;
}

export { useGeolocation };
export type { Geolocation };
