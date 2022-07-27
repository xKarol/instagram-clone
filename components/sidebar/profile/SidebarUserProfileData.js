import clsx from "clsx";

const SidebarUserProfileData = ({ children, className, ...props }) => {
  return (
    <div className={clsx("flex flex-col leading-[20px]", className)} {...props}>
      {children}
    </div>
  );
};

export default SidebarUserProfileData;
