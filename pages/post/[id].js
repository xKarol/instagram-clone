import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import HeaderContainer from "../../containers/header";
import NotFoundPage from "../../pages/404";
import usePhoto from "../../hooks/usePhoto";
import { PostContainer } from "../../containers/post";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const { photo, loading } = usePhoto(id);

  if (!photo && !loading) return <NotFoundPage />;
  return (
    <>
      <Head>
        <title>
          {!loading &&
            `${
              photo?.caption?.length
                ? `${photo?.user?.fullName} on Instagram: “${photo?.caption}“`
                : `Instagram photo by ${photo?.user?.fullName}`
            }`}
        </title>
      </Head>
      <Layout className="flex justify-center">
        <HeaderContainer />
        {!loading && <PostContainer photo={photo} />}
      </Layout>
    </>
  );
}
