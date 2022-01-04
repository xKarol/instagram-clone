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
            <div className="flex h-[600px] bg-white border border-gray-200">
              <div className="w-[480px] h-full">
                <Photo />
              </div>
              <div className="flex flex-col w-[350px]">
                <PostHeader className={"px-[15px]"} />
                <div className="px-[20px] flex-1">
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
                </div>
                <div className="px-[15px]">
                  <Navbar />
                  <Likes />
                  <Date timestamp={photo?.timestamp} />
                </div>
                <AddComment />
              </div>
            </div>
          </PhotoContext.Provider>
        )}
      </Layout>
    </>
  );
}