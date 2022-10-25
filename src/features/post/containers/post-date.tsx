import { PostDate } from "../components";
import { usePostContext } from "../context";

const PostDateContainer = () => {
  const {
    photo: { timestamp },
  } = usePostContext();

  return <PostDate>{timestamp?.toDate()}</PostDate>;
};

export default PostDateContainer;
