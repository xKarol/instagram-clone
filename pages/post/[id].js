import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Photo from "../../components/post/Photo";
import PostHeader from "../../components/post/Header";
import Navbar from "../../components/post/Navbar";
import Likes from "../../components/post/Likes";
import Date from "../../components/post/Date";
import AddComment from "../../components/post/AddComment";
import PhotoContext from "../../context/PhotoContext";
import UserContext from "../../context/UserContext";
import NotFoundPage from "../../pages/404";
import usePhoto from "../../hooks/usePhoto";
import { NORMAL_COMMENT } from "../../constants/post";
import Comments from "../../components/post/comments";
import Avatar from "../../components/Avatar";

export default function () {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useContext(UserContext);
  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { photo, loading, likes, comments, setLikes, setComments } =
    usePhoto(id);

  useEffect(() => {
    setLiked(
      photo?.likes?.findIndex((like) => like?.uid === user?.uid) === -1
        ? false
        : true
    );
  }, [photo?.likes, user?.uid]);

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
        <Header />
        {photo && (
          <PhotoContext.Provider
            value={{
              showModal,
              setShowModal,
              photo,
              liked,
              setLiked,
              setComments,
              setLikes,
              likes,
            }}
          >
            <article className="flex md:h-[600px] flex-col md:flex-row bg-white border border-gray-200">
              <Photo className="w-[80vw] md:w-[50vw] md:max-w-[550px] h-[600px] md:h-full" />
              <section className="flex flex-col md:h-full w-full md:w-[350px] bg-white">
                <PostHeader className={"px-[15px]"} />
                <section className="px-[20px] flex-1 max-h-[200px] md:max-h-[100%] overflow-y-scroll scrollbar-hide">
                  {photo?.caption && (
                    <div className="w-full text-[14px] flex leading-[15px] mb-[4px] justify-between py-[3px]">
                      <div className="space-x-[15px] flex">
                        <Link href={`/${photo?.user?.username}`}>
                          <a className="w-[30px] h-[30px] rounded-full">
                            <Avatar src={photo?.user?.avatar} />
                          </a>
                        </Link>
                        <span className="font-medium">
                          <Link href={`/${photo?.user?.username}`}>
                            <a className="hover:underline">
                              {photo?.user?.username}
                            </a>
                          </Link>
                          &nbsp;
                          <span className="font-normal">{photo?.caption}</span>
                        </span>
                      </div>
                    </div>
                  )}
                  <Comments comments={comments} type={NORMAL_COMMENT} />
                </section>
                <div className="px-[15px]">
                  <Navbar />
                  <Likes />
                  <Date timestamp={photo?.timestamp} />
                </div>
                <AddComment />
              </section>
            </article>
          </PhotoContext.Provider>
        )}
      </Layout>
    </>
  );
}
