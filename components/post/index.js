import Header from "./Header";
import Photo from "./Photo";
import Navbar from "./Navbar";
import Likes from "./Likes";
import Caption from "./Caption";
import Comments from "./Comments";
import MiniComment from "./MiniComment";
import Date from "./Date";
import CreateComment from "./CreateComment";

export default function Post({ username, image, caption, timestamp }) {
  return (
    <div className="flex flex-col bg-white border border-gray-200 mt-[20px] rounded-sm">
      <Header username={username} avatar={null} />
      <Photo photo={image} username={username} caption={caption} />
      <div className="px-[16px]">
        <Navbar />
        <Likes likes={0} />
        <Caption
          username={username}
          caption={
            "testtttttttesttttttttesttttttttesttttttt testtttttttesttttttttesttttttttesttttttttesttttttt testtttttt testtttttttesttttttttesttttttttesttttttt"
          }
        />
        <Comments />
        <MiniComment username={username} comment={"test"} />
        <MiniComment username={username} comment={"test 1"} />
        <MiniComment username={username} comment={"test 2"} />
        <Date date={timestamp} />
      </div>
      <CreateComment />
    </div>
  );
}
