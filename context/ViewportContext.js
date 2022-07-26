import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

export const ViewportContext = createContext(null);

export const useViewport = () => {
  return useContext(ViewportContext);
};

export default function ViewportProvider({ children }) {
  const [width, setWidth] = useState(undefined);
  const [height, setHeight] = useState(undefined);

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <ViewportContext.Provider value={{ width, height }}>
      {children}
    </ViewportContext.Provider>
  );
}
