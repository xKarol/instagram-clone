import React, { Children, cloneElement } from "react";
import clsx from "clsx";
import { ProfileNavButton } from ".";

type Props = React.ComponentPropsWithoutRef<"nav"> & {
  activeIndex: number;
};

const ProfileNav = ({ children, className, activeIndex, ...props }: Props) => {
  return (
    <nav
      className={clsx(
        "w-full border border-transparent border-y-gray-200 md:border-b-transparent flex justify-center md:space-x-[50px] text-gray-300",
        className
      )}
      {...props}
    >
      {Children.map(
        children,
        (
          child: React.ReactComponentElement<typeof ProfileNavButton>,
          index
        ) => {
          if (React.isValidElement(child)) {
            return cloneElement(child, {
              isActive: index === activeIndex,
            });
          }
        }
      )}
    </nav>
  );
};

export default ProfileNav;
