import Image from "next/image";
import Link from "next/link";
import { FaComment } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";

const ProfilePost = ({ data: photo, ...props }) => {
  const { photoId, comments, likes, image } = photo;
  return (
    <li
      className="w-full pb-[100%] bg-gray-200 relative cursor-pointer group"
      {...props}
    >
      <Link href={`/post/${photoId}`}>
        <a>
          <div className="absolute z-10 w-full h-full bg-black/25 hidden items-center justify-center text-white text-[20px] space-x-[20px] group-hover:flex">
            <div className="flex items-center space-x-[5px]">
              <FaComment />
              <span className="font-medium text-[16px]">{comments.length}</span>
            </div>
            <div className="flex items-center space-x-[5px]">
              <AiFillHeart />
              <span className="font-medium text-[16px]">{likes.length}</span>
            </div>
          </div>
          <Image
            src={image}
            alt={"photo"}
            layout="fill"
            objectFit="cover"
            priority
          />
        </a>
      </Link>
    </li>
  );
};

export default ProfilePost;
