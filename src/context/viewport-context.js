import { createContext, useContext, useEffect, useState } from "react";

export const ViewportContext = createContext(null);

export const useViewport = () => {
  return useContext(ViewportContext);
};

const ViewportProvider = ({ children }) => {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

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
};

export default ViewportProvider;
