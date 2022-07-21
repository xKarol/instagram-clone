import { useContext } from "react";
import { PostHeader, PostIcon, PostUsername } from "../../components/post";
import PhotoContext from "../../context/PhotoContext";
import Link from "next/link";
import Avatar from "../../components/avatar";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import PostMenuContainer from "./PostMenu";
import Modal from "../../components/modal";

const PostHeaderContainer = (props) => {
  const { photo: user, setShowModal, showModal } = useContext(PhotoContext);

  return (
    <>
      <PostHeader {...props}>
        <Link href={`/${user.username}`}>
          <a className={"mr-[15px]"}>
            <Avatar src={user.avatar} size={30} />
          </a>
        </Link>
        <PostUsername>{user.username}</PostUsername>
        <PostIcon
          aria-label="post config"
          onClick={() => setShowModal(true)}
          className="ml-auto text-[25px]"
        >
          <HiOutlineDotsHorizontal />
        </PostIcon>
      </PostHeader>
      <Modal
        show={showModal}
        setShow={setShowModal}
        closeHide
        element={<PostMenuContainer />}
      />
    </>
  );
};

export default PostHeaderContainer;
