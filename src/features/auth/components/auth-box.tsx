import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<"section">;

const AuthBox = ({ children, className }: Props) => {
  return (
    <section
      className={clsx(
        "max-w-[300px] xs:max-w-none xs:bg-white xs:border xs:border-gray-200 flex items-center flex-col xs:px-[35px] py-5 w-full",
        className
      )}
    >
      {children}
    </section>
  );
};

export default AuthBox;
