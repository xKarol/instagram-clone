const ProfileNav = ({ children, className, ...props }) => {
  return (
    <nav
      className={`w-full border border-transparent border-y-gray-200 
      md:border-b-transparent flex justify-center md:space-x-[50px] 
      text-gray-300 ${className}`}
      {...props}
    >
      {children}
    </nav>
  );
};

export default ProfileNav;
