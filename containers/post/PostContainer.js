import Link from "next/link";
import Avatar from "../../components/avatar";
import PostProvider from "../../context/PostContext";
import {
  PostImageContainer,
  PostHeaderContainer,
  PostCaptionContainer,
  PostActionsContainer,
  PostLikesContainer,
  PostDateContainer,
  PostCommentFormContainer,
  PostCommentsListContainer,
} from "./";

const PostContainer = ({ ...props }) => {
  const {
    photo: { caption, user },
  } = props;
  const { username, avatar } = user;

  return (
    <PostProvider {...props}>
      <article className="w-full md:w-[80vw] flex md:h-[600px] flex-col lg:flex-row bg-white border border-gray-200 lg:overflow-hidden">
        <PostImageContainer className="w-full !pb-0 min-h-[400px] sm:min-h-[600px] lg:w-[50vw] lg:max-w-[550px]" />
        <section className="md:flex-1 flex flex-col md:h-full w-full lg:w-[350px] bg-white">
          <PostHeaderContainer className={"px-[15px]"} />
          <div className="px-[20px] flex-1 max-h-[200px] md:max-h-[100%] overflow-y-scroll scrollbar-hide">
            {!!caption.length && (
              <div className="w-full text-[14px] flex leading-[15px] mb-[4px] justify-between py-[3px]">
                <div className="space-x-[15px] flex">
                  <Link href={`/${username}`}>
                    <a>
                      <Avatar src={avatar} size={30} />
                    </a>
                  </Link>
                  <PostCaptionContainer show={true} />
                </div>
              </div>
            )}
            <PostCommentsListContainer
              showAvatar={true}
              className="leading-10"
            />
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
  );
};

export default PostContainer;
