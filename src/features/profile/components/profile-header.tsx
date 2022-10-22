import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"header">;

const ProfileHeader = ({ children, className, ...props }: Props) => {
  return (
    <header
      className={clsx("flex mb-[15px] md:mb-[50px]", className)}
      {...props}
    >
      {children}
    </header>
  );
};

export default ProfileHeader;
