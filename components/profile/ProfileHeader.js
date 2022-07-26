const ProfileHeader = ({ children, className, ...props }) => {
  return (
    <header className={`flex mb-[15px] md:mb-[50px] ${className}`} {...props}>
      {children}
    </header>
  );
};

export default ProfileHeader;
