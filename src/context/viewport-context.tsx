import { createContext, useContext } from "react";
import { useWindowSize } from "react-use";

type WindowSizeType = {
  width?: number;
  height?: number;
};

export const ViewportContext = createContext<WindowSizeType | null>(null);

export const useViewport = () => useContext(ViewportContext);

const ViewportProvider = ({ children }) => {
  const { width, height } = useWindowSize();

  return (
    <ViewportContext.Provider value={{ width, height }}>
      {children}
    </ViewportContext.Provider>
  );
};

export default ViewportProvider;
