function NotFoundContainer({ children, className, ...props }) {
  return (
    <section
      className={`flex flex-col items-center justify-center mt-[100px] 
      space-y-[20px] text-center px-[50px] ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}

export default NotFoundContainer;
