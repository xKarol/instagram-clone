import clsx from "clsx";

const ProfileBiography = ({ children, className, ...props }) => {
  return (
    <p className={clsx("font-medium", className)} {...props}>
      {children}
    </p>
  );
};

export default ProfileBiography;
