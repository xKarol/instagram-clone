import { useLayoutEffect, useState, useContext } from "react";
import Header from "./Header";
import Photo from "./Photo";
import Navbar from "./Navbar";
import Likes from "./Likes";
import Caption from "./Caption";
import CommentsCounter from "./CommentsCounter";
import Comments from "./comments";
import Date from "./Date";
import AddComment from "./AddComment";
import PhotoContext from "../../context/PhotoContext";
import UserContext from "../../context/UserContext";
import { MINI_COMMENT } from "../../constants/post";

export default function Post({ data: photo }) {
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(photo?.comments);
  const [likes, setLikes] = useState(photo?.likes);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(UserContext);

  useLayoutEffect(() => {
    setLiked(
      photo?.likes?.findIndex((like) => like?.uid === user?.uid) === -1
        ? false
        : true
    );
  }, [photo?.likes, user?.uid]);

  return (
    <PhotoContext.Provider
      value={{
        showModal,
        setShowModal,
        photo,
        liked,
        setLiked,
        setComments,
        setLikes,
        likes,
      }}
    >
      <div className="flex flex-col bg-white border border-gray-200 mt-[20px] rounded-sm">
        <Header />
        <Photo />
        <div className="px-[16px]">
          <Navbar />
          <Likes />
          <Caption />
          <CommentsCounter />
          <Comments comments={comments} type={MINI_COMMENT} />
          <Date timestamp={photo?.timestamp} />
        </div>
        <AddComment />
      </div>
    </PhotoContext.Provider>
  );
}
