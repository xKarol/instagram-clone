import { useRef, useLayoutEffect } from "react";

export default function ProgressBar({ value, className }) {
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    progressRef.current.style.width = `${value}px`;
  }, [value]);

  return (
    <div className={`h-[4px] ${className}`}>
      <div
        className={`transition-[width] w-[0%] h-full bg-gradient-to-r from-[#28C2F4] to-[#8A2EC7]`}
      ></div>
    </div>
  );
}
