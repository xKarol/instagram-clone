import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import HeaderContainer from "../../containers/header";
import PostProvider from "../../context/PostContext";
import NotFoundPage from "../../pages/404";
import usePhoto from "../../hooks/usePhoto";
import Avatar from "../../components/avatar";
import {
  PostImageContainer,
  PostHeaderContainer,
  PostCaptionContainer,
  PostCommentContainer,
  PostActionsContainer,
  PostCommentFormContainer,
  PostDateContainer,
  PostLikesContainer,
} from "../../containers/post";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  const { photo, loading, comments } = usePhoto(id);

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
        {!loading && (
          <PostProvider photo={photo}>
            <article className="w-full md:w-[80vw] flex md:h-[600px] flex-col lg:flex-row bg-white border border-gray-200 lg:overflow-hidden">
              <PostImageContainer className="w-full !pb-0 min-h-[400px] sm:min-h-[600px] lg:w-[50vw] lg:max-w-[550px]" />
              <section className="md:flex-1 flex flex-col md:h-full w-full lg:w-[350px] bg-white">
                <PostHeaderContainer className={"px-[15px]"} />
                <div className="px-[20px] flex-1 max-h-[200px] md:max-h-[100%] overflow-y-scroll scrollbar-hide">
                  {!!photo.caption.length && (
                    <div className="w-full text-[14px] flex leading-[15px] mb-[4px] justify-between py-[3px]">
                      <div className="space-x-[15px] flex">
                        <Link href={`/${photo?.user?.username}`}>
                          <a>
                            <Avatar src={photo?.user?.avatar} size={30} />
                          </a>
                        </Link>
                        <PostCaptionContainer show={true} />
                      </div>
                    </div>
                  )}
                  <ul>
                    {comments &&
                      comments.map((comment) => (
                        <PostCommentContainer
                          key={comment.commentId}
                          {...comment}
                          showAvatar={true}
                          className="mb-[10px]"
                        />
                      ))}
                  </ul>
                </div>
                <div className="px-[20px]">
                  <PostActionsContainer />
                  <PostLikesContainer />
                  <PostDateContainer />
                </div>
                <PostCommentFormContainer />
              </section>
            </article>
          </PostProvider>
        )}
      </Layout>
    </>
  );
}
