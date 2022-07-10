import { useContext } from "react";
import PostHeader from "../../components/post/PostHeader";
import PostIcon from "../../components/post/PostIcon";
import PostUsername from "../../components/post/PostUsername";
import PhotoContext from "../../context/PhotoContext";
import Link from "next/link";
import Avatar from "../../components/Avatar";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const PostHeaderContainer = (props) => {
  const { photo: user, setShowModal } = useContext(PhotoContext);

  return (
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
  );
};

export default PostHeaderContainer;
