import type { Timestamp } from "firebase/firestore";
import type { UserType } from "./user";

type LikesType = { uid: string }[];

export type PostCommentType = {
  username: string;
  timestamp: Timestamp;
  comment: string;
  commentId: string;
  likes: LikesType;
};

export type PostType = {
  photoId: string;
  image: string;
  caption: string;
  username: string;
  comments: PostCommentType[];
  likes: LikesType;
  timestamp: Timestamp;
  user: UserType;
};
