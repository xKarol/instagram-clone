import Image from "next/image";
import { FaComment } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";

export default function Photo({ src, comments, likes }) {
  return (
    <div className="w-full pb-[100%] bg-gray-200 relative cursor-pointer group">
      <div className="absolute z-10 w-full h-full bg-black/25 hidden items-center justify-center text-white text-[20px] space-x-[20px] group-hover:flex">
        <div className="flex items-center space-x-[5px]">
          <FaComment />
          <span className="font-medium text-[16px]">{likes}</span>
        </div>
        <div className="flex items-center space-x-[5px]">
          <AiFillHeart />
          <span className="font-medium text-[16px]">{comments}</span>
        </div>
      </div>
      <Image src={src} alt={"photo"} layout="fill" objectFit="cover" />
    </div>
  );
}
