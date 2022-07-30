import clsx from "clsx";

const PostUploadCropButton = ({ children, className, ...props }) => {
  return (
    <button
      className={clsx(
        "absolute z-10 w-[30px] h-[30px] flex justify-center items-center",
        className,
        "bottom-[15px] bg-black/75 rounded-full cursor-pointer transition-opacity hover:opacity-50"
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default PostUploadCropButton;
