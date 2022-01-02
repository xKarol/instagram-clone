import { useLayoutEffect, useState, useContext } from "react";
import Header from "./Header";
import Photo from "./Photo";
import Navbar from "./Navbar";
import Likes from "./Likes";
import Caption from "./Caption";
import Comments from "./Comments";
import MiniComment from "./MiniComment";
import Date from "./Date";
import CreateComment from "./CreateComment";
import PhotoContext from "../../context/PhotoContext";
import UserContext from "../../context/UserContext";

export default function Post({ data: photo }) {
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(photo?.comments);
  const [likes, setLikes] = useState(photo?.likes);
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
      value={{ photo, liked, setLiked, setComments, setLikes, likes }}
    >
      <div className="flex flex-col bg-white border border-gray-200 mt-[20px] rounded-sm">
        <Header />
        <Photo />
        <div className="px-[16px]">
          <Navbar />
          <Likes />
          <Caption />
          <Comments count={comments?.length} />
          {!!comments.length &&
            comments
              .slice(0, 3)
              .map((comment) => (
                <MiniComment
                  key={comment.commentId}
                  username={comment.username}
                  comment={comment.comment}
                />
              ))}

          <Date timestamp={photo?.timestamp} />
        </div>
        <CreateComment />
      </div>
    </PhotoContext.Provider>
  );
}
