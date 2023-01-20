import { useState, useEffect } from "react";

function useScrollPosition() {
  const [scroll, setScroll] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleScroll() {
      setScroll({ x: window.scrollX, y: window.scrollY });
    }
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scroll;
}

export { useScrollPosition };
