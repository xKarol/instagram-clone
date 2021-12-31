export default function NavButton({ Icon, text, active }) {
  return (
    <button
      className={`flex-1 md:flex-[0] justify-center md:justify-start uppercase -mt-[1px] py-[10px] md:py-[25px] flex text-[25px] md:text-[12px] font-medium items-center gap-[5px] ${
        !!active &&
        "text-blue md:text-black md:border md:border-transparent md:border-t-black"
      }`}
    >
      {Icon}
      <span className="hidden md:block">{text}</span>
    </button>
  );
}
