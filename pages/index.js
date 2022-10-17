import Layout from "../components/layout";
import { HeaderContainer } from "../features/header/containers";
import { StoriesContainer } from "../features/stories/containers";
import { SidebarContainer } from "../containers/sidebar";
import { PostListContainer } from "../containers/post";

const HomePage = () => {
  return (
    <>
      <HeaderContainer />
      <Layout>
        <div className="relative max-w-none flex flex-col 1000px:pr-[20px] mx-auto 1000px:mx-0 sm:w-full sm:max-w-[665px]">
          <StoriesContainer />
          <PostListContainer />
          <SidebarContainer />
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
