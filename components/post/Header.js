import Link from "next/link";
import { useContext } from "react";
import Avatar from "../Avatar";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import PhotoContext from "../../context/PhotoContext";
import Modal from "../Modal";
import Options from "./Options";

export default function Header({ className }) {
  const { photo, showModal, setShowModal } = useContext(PhotoContext);

  return (
    <div className={`flex h-[60px] items-center px-[20px] ${className}`}>
      <Link href={`/${photo?.user?.username}`}>
        <a className={"w-[30px] h-[30px] mr-[15px]"}>
          <Avatar src={photo?.user?.avatar} />
        </a>
      </Link>
      <Link href={`/${photo?.user?.username}`}>
        <a className="text-[14px] font-medium hover:underline">
          {photo?.user?.username}
        </a>
      </Link>
      <button
        onClick={() => setShowModal(true)}
        className="ml-auto text-[25px] cursor-pointer"
      >
        <HiOutlineDotsHorizontal />
      </button>
      <Modal
        show={showModal}
        setShow={setShowModal}
        closeHide
        element={<Options />}
      />
    </div>
  );
}
