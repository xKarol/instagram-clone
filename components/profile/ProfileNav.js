import { Children, cloneElement } from "react";

const ProfileNav = ({ children, className, active, ...props }) => {
  return (
    <nav
      className={`w-full border border-transparent border-y-gray-200 
      md:border-b-transparent flex justify-center md:space-x-[50px] 
      text-gray-300 ${className}`}
      {...props}
    >
      {Children.map(children, (child, index) =>
        cloneElement(child, { active: index === active })
      )}
    </nav>
  );
};

export default ProfileNav;
