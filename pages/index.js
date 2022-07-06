import { useRef } from "react";
import Suggestions from "../components/suggestions";
import Layout from "../components/Layout";
import usePhotos from "../hooks/usePhotos";
import PostsList from "../components/post/PostsList";
import HeaderContainer from "../containers/header";
import StoriesContainer from "../containers/stories";

export default function Home() {
  const feedRef = useRef(null);
  const { photos } = usePhotos();

  return (
    <>
      <HeaderContainer />
      <Layout>
        <div
          className="max-w-none flex flex-col 1000px:pr-[20px] mx-auto 1000px:mx-0 sm:w-full sm:max-w-[665px]"
          ref={feedRef}
        >
          <StoriesContainer />
          <PostsList photos={photos} />
        </div>
        <Suggestions feedRef={feedRef} />
      </Layout>
    </>
  );
}
