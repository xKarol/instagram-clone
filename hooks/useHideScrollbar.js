import { useEffect } from "react";

const useHideScrollbar = (hide) => {
  useEffect(() => {
    if (hide) {
      document.body.style.overflow = `${hide ? "hidden" : "visible"}`;
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [hide]);

  return null;
};

export default useHideScrollbar;
