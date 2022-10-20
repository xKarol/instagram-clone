import Link from "next/link";
import { Avatar } from "../../../components/avatar";
import { PostContextProvider } from "../context";
import {
  PostActionsContainer,
  PostCaptionContainer,
  PostCommentFormContainer,
  PostCommentsListContainer,
  PostDateContainer,
  PostHeaderContainer,
  PostImageContainer,
  PostLikesContainer,
} from ".";

const PostContainer = ({ ...props }) => {
  const {
    photo: { caption, user },
  } = props;
  const { username, avatar } = user;

  return (
    <PostContextProvider {...props}>
      <article className="w-full md:w-[80vw] flex md:h-[600px] flex-col lg:flex-row bg-white border border-gray-200 lg:overflow-hidden">
        <PostImageContainer className="w-full !pb-0 min-h-[400px] sm:min-h-[600px] lg:w-[50vw] lg:max-w-[550px]" />
        <section className="md:flex-1 flex flex-col md:h-full w-full lg:w-[350px] bg-white">
          <PostHeaderContainer className={"px-[15px]"} />
          <div className="px-[15px] flex-1 max-h-[200px] md:max-h-[100%] overflow-y-scroll scrollbar-hide">
            {caption.length > 0 && (
              <div className="w-full text-[14px] flex leading-[15px] mb-[4px] justify-between py-[3px]">
                <div className="space-x-[15px] flex">
                  <Link href={`/${username}`}>
                    <a>
                      <Avatar
                        src={avatar}
                        size={30}
                        alt={`${username}'s avatar`}
                      />
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
    </PostContextProvider>
  );
};

export default PostContainer;
