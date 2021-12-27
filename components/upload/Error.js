import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function Error({ caption, info }) {
  return (
    //   todo POINTER EVENTS none
    <div className="flex flex-col w-full justify-center items-center">
      <AiOutlineExclamationCircle className="text-[100px]" />
      {caption}
      {info}
    </div>
  );
}