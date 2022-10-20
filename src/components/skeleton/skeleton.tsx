import clsx from "clsx";

type Props = Omit<React.ComponentPropsWithoutRef<"div">, "children">;

const Skeleton = ({ className, ...rest }: Props) => {
  return <div className={clsx("skeleton", className)} {...rest} />;
};

export default Skeleton;
