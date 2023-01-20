import { useState, useEffect } from "react";

function useWindowScroll() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function handleWindowScroll() {
      setScrollY(window.scrollY);
    }

    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  return scrollY;
}

export { useWindowScroll };
