import Link from "next/link";
import { ROUTE_POST } from "../../../constants/routes";
import { PostBody, PostContainer } from "../components";
import { PostContextProvider } from "../context";
import type { PostType } from "../../../@types/posts";
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

type Props = React.ComponentProps<typeof PostContainer> & {
  data: PostType;
};

const PostItemContainer = ({ data: photo, ...props }: Props) => {
  const { photoId, comments } = photo;

  return (
    <PostContextProvider photo={photo}>
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
    </PostContextProvider>
  );
};

export default PostItemContainer;
