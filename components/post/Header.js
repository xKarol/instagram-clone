import Link from "next/link";
import { useContext } from "react";
import Avatar from "../Avatar";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import PhotoContext from "../../context/PhotoContext";

export default function Header() {
  const { photo } = useContext(PhotoContext);

  return (
    <div className="flex h-[60px] items-center px-[20px]">
      <Avatar src={photo?.user?.avatar} size={30} className={"mr-[15px]"} />
      <Link href={`/${photo?.user?.username}`}>
        <a className="text-[14px] font-medium hover:underline">
          {photo?.user?.username}
        </a>
      </Link>
      <HiOutlineDotsHorizontal className="ml-auto text-[25px] cursor-pointer" />
    </div>
  );
}
