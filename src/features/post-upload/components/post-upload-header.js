import clsx from "clsx";

const PostUploadHeader = ({
  children,
  className,
  leftElement,
  rightElement,
  ...props
}) => {
  return (
    <header
      className={clsx(
        "min-w-[350px] w-full h-[45px] py-[9px] font-medium border border-transparent border-b-gray-200 flex items-center justify-between relative",
        className
      )}
      {...props}
    >
      <div className="ml-[15px] flex">{leftElement}</div>
      <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
        {children}
      </div>
      <div className="mr-[15px] flex">{rightElement}</div>
    </header>
  );
};

export default PostUploadHeader;
