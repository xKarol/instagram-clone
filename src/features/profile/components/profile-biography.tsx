import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"p">;

const ProfileBiography = ({ children, className, ...props }: Props) => {
  return (
    <p className={clsx("font-medium", className)} {...props}>
      {children}
    </p>
  );
};

export default ProfileBiography;
