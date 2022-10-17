import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import HeaderContainer from "../../containers/header";
import NotFoundPage from "../../pages/404";
import usePhoto from "../../hooks/use-photo";
import { PostContainer } from "../../containers/post";

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = usePhoto(id);

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
