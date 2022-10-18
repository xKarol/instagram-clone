import { clsx } from "clsx";
import React from "react";
import Loading from "../loading";

const LoadingButton = ({ isLoading = false, className, children, ...rest }) => {
  return (
    <button className={clsx("relative", className)} type="button" {...rest}>
      <div className="absolute translate-x-1/2 ">
        {isLoading ? <Loading /> : null}
      </div>
      <span className={`${isLoading ? "invisible" : ""}`}>{children}</span>
    </button>
  );
};

export default LoadingButton;
