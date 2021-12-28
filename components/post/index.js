import Header from "./Header";
import Photo from "./Photo";
import Navbar from "./Navbar";
import Likes from "./Likes";
import Caption from "./Caption";
import Comments from "./Comments";
import MiniComment from "./MiniComment";
import Date from "./Date";
import CreateComment from "./CreateComment";

export default function Post({
  photoId,
  user,
  timestamp,
  image,
  caption,
  comments,
}) {
  return (
    <div className="flex flex-col bg-white border border-gray-200 mt-[20px] rounded-sm">
      <Header username={user?.username} avatar={user?.avatar} />
      <Photo image={image} username={user?.username} caption={caption} />
      <div className="px-[16px]">
        <Navbar />
        <Likes likes={0} />
        <Caption username={user?.username} caption={caption} />
        <Comments count={comments.length} />
        {!!comments.length &&
          comments
            .slice(0, 3)
            .map((comment) => (
              <MiniComment
                key={comment.commentId}
                username={comment.username}
                avatar={comment.avatar}
                comment={comment.comment}
              />
            ))}

        <Date timestamp={timestamp} />
      </div>
      <CreateComment postId={photoId} />
    </div>
  );
}
