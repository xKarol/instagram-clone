import Link from "next/link";
import { PostContainer, PostBody } from "../../components/post";
import PostProvider from "../../context/PostContext";
import {
  PostHeaderContainer,
  PostDateContainer,
  PostLikesContainer,
  PostCommentFormContainer,
  PostActionsContainer,
  PostCommentsListContainer,
  PostCaptionContainer,
  PostImageContainer,
} from "./";

const PostItemContainer = ({ data: photo, ...props }) => {
  const { photoId, comments } = photo;

  return (
    <PostProvider photo={photo}>
      <PostContainer {...props} className="mb-[20px]" data-cy="post">
        <PostHeaderContainer />
        <PostImageContainer />
        <div className="px-[16px]">
          <PostActionsContainer />
          <PostBody>
            <PostLikesContainer />
            <PostCaptionContainer />
            {!!comments.length && (
              <Link href={`post/${photoId}`}>
                <a className="text-[14px] text-gray-300">
                  View all {comments.length} comments
                </a>
              </Link>
            )}
            <PostCommentsListContainer />
            <PostDateContainer />
          </PostBody>
        </div>
        <PostCommentFormContainer />
      </PostContainer>
    </PostProvider>
  );
};

export default PostItemContainer;
