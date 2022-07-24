function NotFoundHeading({ children, className, ...props }) {
  return (
    <h1 className={`font-medium text-[22px] ${className}`} {...props}>
      {children}
    </h1>
  );
}

export default NotFoundHeading;
