import { BsInstagram } from "react-icons/bs";

const LoginPending = () => {
  return (
    <div className="bg-white w-screen h-screen flex items-center justify-center text-[50px] text-gray-200">
      <BsInstagram data-cy="pending-logo" />
    </div>
  );
};

export default LoginPending;
