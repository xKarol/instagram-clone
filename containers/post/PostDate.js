import { usePostContext } from "../../context/PostContext";
import { PostDate } from "../../components/post";

const PostDateContainer = () => {
  const { photo } = usePostContext();

  return <PostDate>{photo.timestamp?.toDate()}</PostDate>;
};

export default PostDateContainer;
