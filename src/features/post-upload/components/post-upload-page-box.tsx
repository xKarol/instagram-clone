import { forwardRef } from "react";
import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"div">;

const PostUploadBox = forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        className={clsx(
          "h-full w-screen sm:w-[400px] max-w-[400px] mx-auto flex flex-col items-center justify-center",
          className
        )}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
PostUploadBox.displayName = "PostUploadBox";

export default PostUploadBox;
