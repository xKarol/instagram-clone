import clsx from "clsx";

const Loading = ({ className, ...props }) => {
  return <div className={clsx("loading", className)} {...props} />;
};

export default Loading;
