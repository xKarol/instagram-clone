export default function NavButton({ Icon, text, active }) {
  return (
    <button
      className={`uppercase -mt-[1px] py-[15px] flex text-[12px] font-medium items-center gap-[5px] ${
        !!active && "text-black border border-transparent border-t-black"
      }`}
    >
      {Icon}
      {text}
    </button>
  );
}
