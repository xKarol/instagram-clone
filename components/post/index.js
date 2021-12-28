import Header from "./Header";
import Photo from "./Photo";
import Navbar from "./Navbar";
import Likes from "./Likes";
import Caption from "./Caption";
import Comments from "./Comments";
import MiniComment from "./MiniComment";
import Date from "./Date";
import CreateComment from "./CreateComment";

export default function Post({user, timestamp, image, caption}) {
  return (
    <div className="flex flex-col bg-white border border-gray-200 mt-[20px] rounded-sm">
      <Header username={user?.username} avatar={user?.avatar} />
      <Photo image={image} username={user?.username} caption={caption} />
      <div className="px-[16px]">
        <Navbar />
        <Likes likes={0} />
        <Caption username={user?.username} caption={caption} />
        <Comments />
        <MiniComment username={user?.username} comment={"test"} />
        <MiniComment username={user?.username} comment={"test 1"} />
        <MiniComment username={user?.username} comment={"test 2"} />
        <Date timestamp={timestamp} />
      </div>
      <CreateComment />
    </div>
  );
}
