import { Children, cloneElement } from "react";
import clsx from "clsx";

const ProfileNav = ({ children, className, active, ...props }) => {
  return (
    <nav
      className={clsx(
        "w-full border border-transparent border-y-gray-200 md:border-b-transparent flex justify-center md:space-x-[50px] text-gray-300",
        className
      )}
      {...props}
    >
      {Children.map(children, (child, index) =>
        cloneElement(child, { active: index === active })
      )}
    </nav>
  );
};

export default ProfileNav;
