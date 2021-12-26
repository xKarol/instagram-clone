import Header from "./Header";
import Photo from "./Photo";
import Navbar from "./Navbar";
import Likes from "./Likes";
import Caption from "./Caption";
import Comments from "./Comments";
import MiniComment from "./MiniComment";
import Date from "./Date";
import CreateComment from "./CreateComment";

export default function Post({ username, user, image, caption, timestamp }) {
  const { userAvatar: avatar } = user;
  return (
    <div className="flex flex-col bg-white border border-gray-200 mt-[20px] rounded-sm">
      <Header username={username} avatar={null} />
      <Photo image={image} username={username} caption={caption} />
      <div className="px-[16px]">
        <Navbar />
        <Likes likes={0} />
        <Caption username={username} caption={caption} />
        <Comments />
        <MiniComment username={username} comment={"test"} />
        <MiniComment username={username} comment={"test 1"} />
        <MiniComment username={username} comment={"test 2"} />
        <Date timestamp={timestamp} />
      </div>
      <CreateComment />
    </div>
  );
}
