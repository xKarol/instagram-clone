import { useEffect, useLayoutEffect, useState, useRef } from "react";

export default function DropdownMenu({ setShow, show, element }) {
  const [selectTarget, setTarget] = useState(null);
  const DropdownRef = useRef(null);

  const handleResize = () => {
    if (!selectTarget) return;
    const rect = selectTarget.getBoundingClientRect();
    DropdownRef.current.style.left = `${rect.left - 170}px`;
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.id !== "dropdown") {
        if (!show) return;
        setShow(false);
        return;
      }
      setTarget(e.target);
    };
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
    };
  }, [show]);

  useLayoutEffect(() => {
    handleResize();
  }, [selectTarget]);

  return (
    <>
      <div
        className={`fixed min-w-[220px] rounded-md top-[55px] z-50 shadow-[0_0_10px_2px_rgba(0,0,0,0.1)] ${
          !show && "hidden"
        }`}
        ref={DropdownRef}
      >
        {element}
      </div>
    </>
  );
}
