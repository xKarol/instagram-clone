import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const PostDate = ({ children, className, ...props }) => {
  return (
    <p
      className={clsx(
        "uppercase text-[10px] text-gray-300 mt-[5px] mb-[16px]",
        className
      )}
      {...props}
    >
      {dayjs(children).fromNow()}
    </p>
  );
};

export default PostDate;
