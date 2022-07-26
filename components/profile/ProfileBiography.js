const ProfileBiography = ({ children, className, ...props }) => {
  return (
    <p className={`font-medium ${className}`} {...props}>
      {children}
    </p>
  );
};

export default ProfileBiography;
