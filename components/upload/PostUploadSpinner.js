import clsx from "clsx";
import { IoMdCheckmark } from "react-icons/io";

const PostUploadSpinner = ({ className, spin = true, ...props }) => {
  return (
    <div
      className={clsx(
        spin && "animate-spin",
        className,
        "p-1 flex items-center justify-center w-[100px] h-[100px] bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-full relative",
        "before:bg-white before:w-full before:h-full before:rounded-full"
      )}
      {...props}
    >
      {!spin && (
        <IoMdCheckmark className="absolute text-[35px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#fcb045]" />
      )}
    </div>
  );
};

export default PostUploadSpinner;
