const StoriesContainer = ({ children, className, ...props }) => {
  return (
    <section
      className={`w-full bg-white border border-gray-200 flex flex-col 
      py-[20px] pb-[10px] rounded-sm relative ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

export default StoriesContainer;
