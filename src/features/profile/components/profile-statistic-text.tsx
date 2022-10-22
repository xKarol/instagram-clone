import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"span"> & {
  value: number;
};

const ProfileStatisticText = ({
  children,
  className,
  value,
  ...props
}: Props) => {
  return (
    <span
      className={clsx(
        "flex-1 md:flex-[0] flex justify-center items-center flex-col md:flex-row text-gray-300 md:text-black",
        className
      )}
      {...props}
    >
      <b className="font-medium text-black">{value}</b>
      &nbsp;
      {children}
    </span>
  );
};

export default ProfileStatisticText;
