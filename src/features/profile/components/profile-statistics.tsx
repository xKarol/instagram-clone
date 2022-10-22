import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"section">;

const ProfileStatistics = ({ children, className, ...props }: Props) => {
  return (
    <section
      className={clsx(
        "flex text-[14px] md:text-[16px] md:space-x-[30px] py-[5px]",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default ProfileStatistics;
