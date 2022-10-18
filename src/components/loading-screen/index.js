import { BsInstagram } from "react-icons/bs";

const LoadingScreen = () => {
  return (
    <div className="bg-white w-screen h-screen flex items-center justify-center text-[50px] text-gray-200">
      <BsInstagram data-testid="pending-logo" />
    </div>
  );
};

export default LoadingScreen;
