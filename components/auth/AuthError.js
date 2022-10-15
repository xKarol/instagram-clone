const AuthError = ({ children, className, ...rest }) => {
  return (
    children && (
      <span
        data-testid="validation-error"
        {...rest}
        className={clsx("text-red text-[14px] text-center", className)}
      >
        {children}
      </span>
    )
  );
};

export default AuthError;
