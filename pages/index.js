import Layout from "../components/layout";
import usePhotos from "../hooks/usePhotos";
import HeaderContainer from "../containers/header";
import StoriesContainer from "../containers/stories";
import PostContainer from "../containers/post";
import SidebarContainer from "../containers/sidebar";
import Loading from "../components/loading";

export default function Home() {
  const { photos, loading } = usePhotos();

  return (
    <>
      <HeaderContainer />
      <Layout>
        <div className="relative max-w-none flex flex-col 1000px:pr-[20px] mx-auto 1000px:mx-0 sm:w-full sm:max-w-[665px]">
          <StoriesContainer />
          {loading ? (
            <Loading className="mt-[50px]" />
          ) : (
            photos.map((photo) => (
              <PostContainer key={photo.photoId} data={photo} />
            ))
          )}
          <SidebarContainer />
        </div>
      </Layout>
    </>
  );
}
