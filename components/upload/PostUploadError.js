import clsx from "clsx";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const PostUploadError = ({
  children,
  captionText,
  elementsProps,
  ...props
}) => {
  const captionProps = elementsProps?.caption;

  return (
    <div
      className="flex flex-col w-full justify-center items-center"
      {...props}
    >
      <AiOutlineExclamationCircle className="text-[100px]" />
      <p
        {...captionProps}
        className={clsx("text-[20px] text-center", captionProps?.className)}
      >
        {captionText}
      </p>
      {children}
    </div>
  );
};

export default PostUploadError;
