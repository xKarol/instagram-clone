import { BiChevronRight } from "react-icons/bi";

export default function Arrow({ className, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer flex justify-center items-center text-[20px] z-10 w-[25px] h-[25px] bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.3)] rounded-full absolute top-1/2 -translate-y-1/2 ${className}`}
    >
      <BiChevronRight />
    </div>
  );
}
