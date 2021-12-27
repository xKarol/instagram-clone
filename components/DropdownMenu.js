import { useEffect, useState, useRef } from "react";

export default function DropdownMenu({ setShow, show, element }) {
  const [selectTarget, setTarget] = useState(null);
  const DropdownRef = useRef(null);

  useEffect(() => {
    const handleResize = (e) => {
      // if (!show) return;
      const getTarget = selectTarget ? selectTarget : e;
      const rect = getTarget.getBoundingClientRect();
      //TODO naprawic bug z use ref undefined
      DropdownRef.current.style.left = `${rect.left - 170}px`;
    };
    const handleClick = (e) => {
      setTarget(e.target);
      handleResize(e.target);
      if (!show) return;
      setShow(false);
    };
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, [selectTarget, show, DropdownRef.current]);

  return (
    <>
      {show && (
        <div
          className="fixed min-w-[220px] rounded-md top-[55px] z-50 shadow-[0_0_10px_2px_rgba(0,0,0,0.1)]"
          ref={DropdownRef}
        >
          {element}
        </div>
      )}
    </>
  );
}
