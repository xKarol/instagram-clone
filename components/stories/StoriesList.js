import { forwardRef } from "react";

const StoriesList = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <ul
      className={`w-full flex space-x-[10px] relative overflow-y-scroll scroll-smooth
      scrollbar-hide px-[20px] ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </ul>
  );
});
StoriesList.displayName = "StoriesList";

export default StoriesList;
