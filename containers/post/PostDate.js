import { useContext } from "react";
import PostDate from "../../components/post/PostDate";
import PhotoContext from "../../context/PhotoContext";

const PostDateContainer = () => {
  const { photo } = useContext(PhotoContext);

  return <PostDate>{photo.timestamp?.toDate()}</PostDate>;
};

export default PostDateContainer;
