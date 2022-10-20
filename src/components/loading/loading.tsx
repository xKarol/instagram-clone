import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"div">;

const Loading = ({ className, ...props }: Props) => {
  return <div className={clsx("loading", className)} {...props} />;
};

export default Loading;
