import Link from "next/link";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import PostMenuContainer from "./post-menu";
import { Avatar } from "../../../components/avatar";
import { Modal } from "../../../components/modal";
import { PostHeader, PostIcon, PostUsername } from "../components";
import { usePostContext } from "../context";

type Props = React.ComponentProps<typeof PostHeader>;

const PostHeaderContainer = (props: Props) => {
  const {
    photo: { user },
    setShowModal,
    showModal,
  } = usePostContext();
  const { username, avatar } = user;

  return (
    <>
      <PostHeader {...props}>
        <Link href={`/${username}`}>
          <a className={"mr-[15px]"}>
            <Avatar src={avatar.src} size={30} alt={`${username}'s avatar`} />
          </a>
        </Link>
        <PostUsername>{username}</PostUsername>
        <PostIcon
          aria-label="post config"
          onClick={() => setShowModal(true)}
          className="ml-auto text-[25px]"
        >
          <HiOutlineDotsHorizontal />
        </PostIcon>
      </PostHeader>
      <Modal show={showModal} setShow={setShowModal} hideCloseIcon>
        <PostMenuContainer />
      </Modal>
    </>
  );
};

export default PostHeaderContainer;
