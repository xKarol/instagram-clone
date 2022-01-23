import { useContext, useState, useEffect, useRef } from "react";
import UserContext from "../../context/UserContext";
import useStories from "../../hooks/useStories";
import Loading from "../Loading";
import Skeleton from "../Skeleton";
import Arrow from "./Arrow";
import StoryProfile from "./StoryProfile";

export default function Stories() {
  const [scrollPos, setScrollPos] = useState(0);
  const [showRight, setShowRight] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const { user, loggedIn } = useContext(UserContext);
  const { stories, loading } = useStories(user);
  const storyBox = useRef(null);
  const visible = loggedIn && user?.followings?.length;

  useEffect(() => {
    const checkScroll = () => {
      if (!visible || loading) return;
      setShowLeft(scrollPos > 0 ? true : false);
      const scrollWidth = storyBox.current.clientWidth;
      const scrollMaxWidth = storyBox.current.scrollWidth;

      if (scrollMaxWidth > scrollWidth) {
        setShowRight(true);
        if (scrollMaxWidth - scrollPos === scrollWidth) {
          setShowRight(false);
        }
      }
    };
    checkScroll();
  }, [scrollPos, loading, visible]);

  const handleScrollRight = () => {
    storyBox.current.scrollLeft += storyBox.current.clientWidth - 100;
  };

  const handleScrollLeft = () => {
    storyBox.current.scrollLeft -= storyBox.current.clientWidth - 100;
  };

  return (
    <>
      {!!visible && (
        <section className="w-full bg-white border border-gray-200 flex flex-col py-[20px] pb-[10px] rounded-sm">
          {!!loading && <Loading />}
          <div className="w-full h-full relative">
            {showLeft && (
              <Arrow
                className="left-[15px] rotate-180"
                onClick={handleScrollLeft}
              />
            )}
            {showRight && (
              <Arrow className="right-[15px]" onClick={handleScrollRight} />
            )}
            <div
              className="w-full flex space-x-[10px] relative overflow-y-scroll scroll-smooth scrollbar-hide px-[20px]"
              onScroll={(e) => setScrollPos(e.target.scrollLeft)}
              ref={storyBox}
            >
              {!!loading &&
                [...new Array(12)].map((_, index) => (
                  <Skeleton
                    key={index}
                    className="shrink-0 mt-[10px] rounded-full w-[50px] h-[50px]"
                  />
                ))}
              {!!stories.length &&
                stories.map((data) => (
                  <StoryProfile
                    key={data?.uid}
                    username={data?.username}
                    avatar={data?.avatar}
                    active
                  />
                ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
