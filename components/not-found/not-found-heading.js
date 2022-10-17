import clsx from "clsx";

function NotFoundHeading({ children, className, ...props }) {
  return (
    <h1 className={clsx("font-medium text-[22px]", className)} {...props}>
      {children}
    </h1>
  );
}

export default NotFoundHeading;
