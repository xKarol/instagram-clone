import clsx from "clsx";
import { LoadingButton } from "../loading-button";

const SubmitButton = ({
  isDisabled,
  isLoading,
  children,
  className,
  ...rest
}) => {
  return (
    <LoadingButton
      disabled={isDisabled}
      isLoading={isLoading}
      type="submit"
      data-testid="validation-submit"
      {...rest}
      className={clsx(
        "h-[30px] flex items-center justify-center rounded-sm text-[14px] w-full text-white bg-blue mt-[10px] py-[5px] font-medium disabled:opacity-25",
        className
      )}
    >
      {children}
    </LoadingButton>
  );
};

export default SubmitButton;
