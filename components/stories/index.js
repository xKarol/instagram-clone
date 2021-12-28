import { useContext, useState, useEffect } from "react";
import StoryProfile from "./StoryProfile";
import { getUserStories } from "../../services/firebase";
import UserContext from "../../context/UserContext";
import Loading from "../Loading";
import Skeleton from "../Skeleton";

export default function Stories() {
  const [story, setStory] = useState([]);
  const [loading, setLoading] = useState([]);
  const { user, loggedIn } = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      if (!user.uid) return;
      !story.length && setLoading(true);
      const stories = await getUserStories(user?.uid);
      setStory(stories);
      setLoading(false);
    };
    getData();
  }, [user?.followings]);

  return (
    <>
      {loggedIn && !!user?.followings?.length && (
        <section className="w-full bg-white border border-gray-200 flex flex-col py-[20px] pb-[10px] rounded-sm">
          {!!loading && <Loading />}
          <div className="w-full flex space-x-[10px] overflow-x-hidden px-[20px]">
            {!!loading &&
              [...new Array(12)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="shrink-0 mt-[10px] rounded-full w-[50px] h-[50px]"
                />
              ))}
            {!!story.length &&
              story.map((data) => (
                <StoryProfile
                  key={data.uid}
                  username={data.username}
                  avatar={data.avatar}
                  active
                />
              ))}
          </div>
        </section>
      )}
    </>
  );
}
