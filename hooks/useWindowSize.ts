import { useEffect, useRef, useState } from "react";

export function useWindowSize() {
  const [screenSize, setScreenSize] = useState(-1);
  useEffect(() => {
    const handelResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handelResize);
    return () => window.removeEventListener("resize", handelResize);
  }, []);
  return screenSize;
}
