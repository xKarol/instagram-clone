export default function DropdownMenu({
  children,
  className,
  items,
  setShow,
  show,
  showIndicator = true,
  ...props
}) {
  return (
    <div className="relative flex">
      {children}
      {!!show && (
        <>
          {!!showIndicator && (
            <div
              className="shadow-[0_0_5px_1px_rgba(0,0,0,0.05)] absolute right-[3px] 
              top-[32px] bg-white w-[15px] h-[15px] rotate-45"
            />
          )}
          <div
            className={`bg-white absolute right-[-28px] rounded-md top-[38px] z-50 
            shadow-[0_0_10px_2px_rgba(0,0,0,0.05)] ${className}`}
            {...props}
          >
            <div className="bg-white w-full h-full rounded-md">{items}</div>
          </div>
        </>
      )}
    </div>
  );
}
