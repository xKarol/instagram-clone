import { useRef } from "react";
import Suggestions from "../components/suggestions";
import Stories from "../components/stories";
import Layout from "../components/Layout";
import usePhotos from "../hooks/usePhotos";
import PostsList from "../components/post/PostsList";
import HeaderContainer from "../containers/header";

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
          <Stories />
          <PostsList photos={photos} />
        </div>
        <Suggestions feedRef={feedRef} />
      </Layout>
    </>
  );
}
