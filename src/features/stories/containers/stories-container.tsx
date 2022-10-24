import React from "react";
import { Loading } from "../../../components/loading";
import { Skeleton } from "../../../components/skeleton";
import { useUserContext } from "../../../context/user-context";
import {
  StoriesArrow,
  StoriesContainer as Container,
  StoriesList,
  StoriesItem,
} from "../components";
import { useStories, useScrollStories } from "../hooks";

type Props = React.ComponentProps<typeof Container>;

const StoriesContainer = ({ ...props }: Props) => {
  const { ref, changePosition, onScroll, showLeft, showRight } =
    useScrollStories();
  const { user, loggedIn } = useUserContext();
  const { data, loading, error } = useStories(user?.uid);
  const visible = loggedIn && !error && user?.followings?.length;

  if (!visible) return null;
  return (
    <Container className="mb-[20px]" {...props}>
      {loading && <Loading className={"mb-[10px]"} />}
      {showLeft && (
        <StoriesArrow
          className="left-[15px] rotate-180"
          onClick={() => changePosition("left")}
        />
      )}
      {showRight && (
        <StoriesArrow
          className="right-[15px]"
          onClick={() => changePosition("right")}
        />
      )}
      <StoriesList onScroll={onScroll} ref={ref}>
        {loading
          ? [...Array.from({ length: 12 })].map((_, index) => (
              <Skeleton
                key={index}
                className="rounded-full w-[50px] h-[50px]"
              />
            ))
          : data.map(({ uid, username, avatar }) => (
              <StoriesItem
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
