const ProfileStatisticText = ({ children, className, value, ...props }) => {
  return (
    <span
      className={`flex-1 md:flex-[0] flex justify-center items-center 
        flex-col md:flex-row text-gray-300 md:text-black ${className}`}
      {...props}
    >
      <b className="font-medium text-black">{value}</b>
      &nbsp;
      {children}
    </span>
  );
};

export default ProfileStatisticText;
