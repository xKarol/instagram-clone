import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Photo from "../../components/post/Photo";
import PostHeader from "../../components/post/Header";
import Navbar from "../../components/post/Navbar";
import Likes from "../../components/post/Likes";
import Date from "../../components/post/Date";
import Comment from "../../components/post/Comment";
import CreateComment from "../../components/post/CreateComment";
import PhotoContext from "../../context/PhotoContext";
import UserContext from "../../context/UserContext";
import { getPhotoById } from "../../services/firebase";
import NotFoundPage from "../../pages/404";

export default function () {
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const { user } = useContext(UserContext);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setLiked(
      photo?.likes?.findIndex((like) => like?.uid === user?.uid) === -1
        ? false
        : true
    );
  }, [photo?.likes, user?.uid]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const photo = await getPhotoById(id);
      setComments(photo?.comments);
      setLikes(photo?.likes);
      setPhoto(photo);
      setLoading(false);
    };
    getData();
  }, []);

  if (!photo && !loading) return <NotFoundPage />;
  return (
    <Layout className="flex justify-center">
      <Header />
      {photo && (
        <PhotoContext.Provider
          value={{ photo, liked, setLiked, setComments, setLikes, likes }}
        >
          <div className="flex h-[600px] bg-white border border-gray-200">
            <div className="w-[480px] h-full">
              <Photo />
            </div>
            <div className="flex flex-col w-[350px]">
              <PostHeader className={"px-[15px]"} />
              <div className="px-[15px] flex-1">
                {!!comments.length &&
                  comments.map((comment) => (
                    <Comment
                      key={comment.commentId}
                      username={comment.username}
                      avatar={comment.avatar}
                      comment={comment.comment}
                    />
                  ))}
              </div>
              <div className="px-[15px]">
                <Navbar />
                <Likes />
                <Date timestamp={photo?.timestamp} />
              </div>
              <CreateComment />
            </div>
          </div>
        </PhotoContext.Provider>
      )}
    </Layout>
  );
}
