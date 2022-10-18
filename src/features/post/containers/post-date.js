import { PostDate } from "../components";
import { usePostContext } from "../context";

const PostDateContainer = () => {
  const { photo } = usePostContext();

  return <PostDate>{photo.timestamp?.toDate()}</PostDate>;
};

export default PostDateContainer;
