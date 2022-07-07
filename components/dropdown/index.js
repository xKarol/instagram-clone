export default function DropdownMenu({
  children,
  className,
  items,
  showIndicator = true,
  ...props
}) {
  return (
    <button className="relative flex group">
      {children}
      <div
        className={`text-[14px] bg-white absolute right-[-28px] rounded-md top-[38px] z-50 
            shadow-[0_0_10px_2px_rgba(0,0,0,0.05)] ${className} hidden group-focus-within:block`}
        {...props}
      >
        {!!showIndicator && (
          <div
            className="shadow-[0_0_5px_1px_rgba(0,0,0,0.05)] absolute right-[32px] 
            top-[-8px] bg-white w-[15px] h-[15px] rotate-45 z-[-1]"
          />
        )}

        <div className="bg-white w-full h-full rounded-md">{items}</div>
      </div>
    </button>
  );
}
