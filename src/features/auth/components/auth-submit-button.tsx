import clsx from "clsx";
import { LoadingButton } from "../../../components/loading-button";

type Props = React.ComponentPropsWithRef<typeof LoadingButton> & {
  isDisabled?: boolean;
  isLoading?: boolean;
};

const AuthSubmitButton = ({
  isDisabled = false,
  isLoading = false,
  children,
  className,
  ...rest
}: Props) => {
  return (
    <LoadingButton
      disabled={isDisabled}
      isLoading={isLoading}
      type="submit"
      data-testid="validation-submit"
      className={clsx(
        "h-[30px] flex items-center justify-center rounded-sm text-[14px] w-full text-white bg-blue mt-[10px] py-[5px] font-medium disabled:opacity-25",
        className
      )}
      {...rest}
    >
      {children}
    </LoadingButton>
  );
};

export default AuthSubmitButton;
