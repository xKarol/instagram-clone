import { useContext, useState, useEffect, useRef } from "react";
import { default as Container } from "../components/stories/StoriesContainer";
import StoriesArrow from "../components/stories/StoriesArrow";
import StoryProfile from "../components/stories/StoriesProfile";
import UserContext from "../context/UserContext";
import useStories from "../hooks/useStories";
import Loading from "../components/loading";
import Skeleton from "../components/skeleton";
import StoriesList from "../components/stories/StoriesList";

const StoriesContainer = ({ ...props }) => {
  const [scrollPos, setScrollPos] = useState(0);
  const [showRight, setShowRight] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const { user, loggedIn } = useContext(UserContext);
  const { stories, loading } = useStories(user.uid);
  const storyBox = useRef(null);
  const visible = loggedIn && user?.followings?.length;

  useEffect(() => {
    const checkScroll = () => {
      const element = storyBox.current;
      if (!element || !visible || loading) return;
      setShowLeft(scrollPos > 0 ? true : false);
      const scrollWidth = element.clientWidth;
      const scrollMaxWidth = element.scrollWidth;

      if (scrollMaxWidth > scrollWidth) {
        setShowRight(true);
        if (scrollMaxWidth - scrollPos === scrollWidth) {
          setShowRight(false);
        }
      }
    };
    checkScroll();
  }, [scrollPos, loading, visible]);

  const handleScroll = (direction) => {
    const element = storyBox.current;
    const { clientWidth } = element;
    if (direction === "left") {
      return (element.scrollLeft -= clientWidth - 100);
    }
    element.scrollLeft += clientWidth - 100;
  };

  return (
    <Container {...props}>
      {loading && <Loading className={"mb-[10px]"} />}
      {showLeft && (
        <StoriesArrow
          className="left-[15px] rotate-180"
          onClick={() => handleScroll("left")}
        />
      )}
      {showRight && (
        <StoriesArrow
          className="right-[15px]"
          onClick={() => handleScroll("right")}
        />
      )}
      <StoriesList
        onScroll={(e) => setScrollPos(e.target.scrollLeft)}
        ref={storyBox}
      >
        {loading
          ? [...new Array(12)].map((_, index) => (
              <Skeleton
                key={index}
                className="rounded-full w-[50px] h-[50px]"
              />
            ))
          : stories.map(({ uid, username, avatar }) => (
              <StoryProfile
                key={uid}
                username={username}
                avatar={avatar}
                active
              />
            ))}
      </StoriesList>
    </Container>
  );
};

export default StoriesContainer;
