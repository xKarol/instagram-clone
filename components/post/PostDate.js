import clsx from "clsx";
import Moment from "react-moment";

const PostDate = ({ children, className, ...props }) => {
  return (
    <p
      className={clsx(
        "uppercase text-[10px] text-gray-300 mt-[5px] mb-[16px]",
        className
      )}
      {...props}
    >
      <Moment fromNow>{children}</Moment>
    </p>
  );
};

export default PostDate;
