import { usePostContext } from "../../context/post-context";
import { PostDate } from "../../components/post";

const PostDateContainer = () => {
  const { photo } = usePostContext();

  return <PostDate>{photo.timestamp?.toDate()}</PostDate>;
};

export default PostDateContainer;
