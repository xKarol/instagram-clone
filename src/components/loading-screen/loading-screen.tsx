import { BsInstagram } from "react-icons/bs";

type Props = React.ComponentPropsWithoutRef<"div">;

const LoadingScreen = ({ ...rest }): Props => {
  return (
    <div
      className="bg-white w-screen h-screen flex items-center justify-center text-[50px] text-gray-200"
      {...rest}
    >
      <BsInstagram data-testid="pending-logo" />
    </div>
  );
};

export default LoadingScreen;
