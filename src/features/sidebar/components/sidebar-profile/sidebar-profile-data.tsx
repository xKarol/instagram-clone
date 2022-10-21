import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"div">;

const SidebarUserProfileData = ({ children, className, ...props }: Props) => {
  return (
    <div className={clsx("flex flex-col leading-[20px]", className)} {...props}>
      {children}
    </div>
  );
};

export default SidebarUserProfileData;
