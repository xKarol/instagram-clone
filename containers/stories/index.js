import { useState, useEffect, useRef } from "react";
import { useUserContext } from "../../context/UserContext";
import useStories from "../../hooks/useStories";
import Loading from "../../components/loading";
import Skeleton from "../../components/skeleton";
import {
  StoriesContainer as Container,
  StoriesList,
  StoriesArrow,
  StoriesProfile,
} from "../../components/stories";

const StoriesContainer = ({ ...props }) => {
  const [scrollPos, setScrollPos] = useState(0);
  const [showRight, setShowRight] = useState(false);
  const [showLeft, setShowLeft] = useState(false);
  const { user, loggedIn } = useUserContext();
  const { stories, loading, error } = useStories(user.uid, user?.followings);
  const storyBox = useRef(null);
  const visible = loggedIn && !error && user?.followings?.length;

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

  return visible ? (
    <Container className="mb-[20px]" {...props}>
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
              <StoriesProfile
                key={uid}
                username={username}
                avatar={avatar}
                active
              />
            ))}
      </StoriesList>
    </Container>
  ) : null;
};

export default StoriesContainer;
