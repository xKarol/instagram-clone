const SidebarUserProfileData = ({ children, className, ...props }) => {
  return (
    <div className={`flex flex-col leading-[20px] ${className}`} {...props}>
      {children}
    </div>
  );
};

export default SidebarUserProfileData;
