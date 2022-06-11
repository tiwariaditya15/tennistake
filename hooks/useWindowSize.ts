import { useEffect, useState } from "react";

export function useWindowSize() {
  const [screenSize, setScreenSize] = useState<number | null>(null);
  useEffect(() => {
    const handelResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handelResize);
    return () => window.removeEventListener("resize", handelResize);
  }, []);
  return screenSize;
}
