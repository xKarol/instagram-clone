const ProfilePostsList = ({ children, className, ...props }) => {
  return (
    <ul
      className={`grid grid-cols-[repeat(3,minmax(80px,_1fr))] w-full gap-[3px] md:gap-[30px] ${className}`}
      {...props}
    >
      {children}
    </ul>
  );
};

export default ProfilePostsList;
