const HeaderAuth = ({ children, className, ...props }) => {
  return (
    <section className={`flex items-center first-line:${className}`} {...props}>
      {children}
    </section>
  );
};

export default HeaderAuth;
