import Head from "next/head";
import { useRouter } from "next/router";
import { Layout } from "../../components/layout";
import { HeaderContainer } from "../../features/header/containers";
import { PostContainer } from "../../features/post/containers";
import { usePost } from "../../features/post/hooks";
import NotFoundPage from "../404";

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = usePost(id);

  if (!data && !loading) return <NotFoundPage />;
  return (
    <>
      <Head>
        <title>
          {!loading &&
            `${
              data?.caption?.length
                ? `${data?.user?.fullName} on Instagram: “${data?.caption}“`
                : `Instagram photo by ${data?.user?.fullName}`
            }`}
        </title>
      </Head>
      <Layout className="flex justify-center">
        <HeaderContainer />
        {!loading && <PostContainer photo={data} />}
      </Layout>
    </>
  );
};

export default PostPage;
