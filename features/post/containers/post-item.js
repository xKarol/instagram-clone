import Link from "next/link";
import { ROUTE_POST } from "../../../constants/routes";
import PostProvider from "../../../context/post-context";
import { PostBody, PostContainer } from "../components";
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

const PostItemContainer = ({ data: photo, ...props }) => {
  const { photoId, comments } = photo;

  return (
    <PostProvider photo={photo}>
      <PostContainer {...props} className="mb-[20px]" data-testid="post">
        <PostHeaderContainer />
        <PostImageContainer />
        <div className="px-[16px]">
          <PostActionsContainer />
          <PostBody>
            <PostLikesContainer />
            <PostCaptionContainer />
            {comments.length > 0 && (
              <Link href={`${ROUTE_POST}/${photoId}`}>
                <a className="text-[14px] text-gray-300">
                  View all {comments.length} comments
                </a>
              </Link>
            )}
            <PostCommentsListContainer className="leading-tight" />
            <PostDateContainer />
          </PostBody>
        </div>
        <PostCommentFormContainer />
      </PostContainer>
    </PostProvider>
  );
};

export default PostItemContainer;
