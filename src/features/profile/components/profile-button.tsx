import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"button">;

const ProfileButton = ({ children, className, ...props }: Props) => {
  return (
    <button
      className={clsx(
        "text-[14px] h-[30px] flex justify-center items-center px-[8px] font-medium border border-gray-200 rounded-[5px]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default ProfileButton;
