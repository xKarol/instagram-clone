const StoriesContainer = ({ children, className, ...props }) => {
  return (
    <section
      className={`w-full bg-white border border-gray-200 flex flex-col 
      py-[20px] pb-[10px] rounded-sm relative h-[110px] ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

export default StoriesContainer;
