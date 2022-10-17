import { usePostContext } from "../../../context/post-context";
import { PostDate } from "../components";

const PostDateContainer = () => {
  const { photo } = usePostContext();

  return <PostDate>{photo.timestamp?.toDate()}</PostDate>;
};

export default PostDateContainer;
