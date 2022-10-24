import { useCallback, useEffect, useRef, useState } from "react";

const useScrollStories = () => {
  const [scrollPos, setScrollPos] = useState(0);
  const [showRight, setShowRight] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const ref = useRef<HTMLUListElement>(null);
  const elementRef = ref.current;

  useEffect(() => {
    const checkScroll = () => {
      if (!elementRef) return;
      setShowLeft(scrollPos > 0 ? true : false);
      const scrollWidth = elementRef.clientWidth;
      const scrollMaxWidth = elementRef.scrollWidth;

      if (scrollMaxWidth > scrollWidth) {
        setShowRight(true);
        if (scrollMaxWidth - scrollPos === scrollWidth) {
          setShowRight(false);
        }
      }
    };
    checkScroll();
  }, [scrollPos, elementRef]);

  const changePosition = useCallback(
    (direction: "left" | "right") => {
      const { clientWidth } = elementRef;
      if (direction === "left") {
        elementRef.scrollLeft -= clientWidth - 100;
        return;
      }
      elementRef.scrollLeft += clientWidth - 100;
    },
    [elementRef]
  );

  const onScroll = useCallback(
    () => setScrollPos(elementRef.scrollLeft),
    [elementRef]
  );

  return {
    ref,
    changePosition,
    onScroll,
    showRight,
    showLeft,
  };
};

export default useScrollStories;
