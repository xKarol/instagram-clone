import Suggestions from "../components/suggestions";
import Layout from "../components/layout";
import usePhotos from "../hooks/usePhotos";
import HeaderContainer from "../containers/header";
import StoriesContainer from "../containers/stories";
import PostContainer from "../containers/post";

export default function Home() {
  const { photos } = usePhotos();

  return (
    <>
      <HeaderContainer />
      <Layout>
        <div className="relative max-w-none flex flex-col 1000px:pr-[20px] mx-auto 1000px:mx-0 sm:w-full sm:max-w-[665px]">
          <StoriesContainer />
          {photos.map((photo) => (
            <PostContainer key={photo.photoId} data={photo} />
          ))}
          <Suggestions />
        </div>
      </Layout>
    </>
  );
}
