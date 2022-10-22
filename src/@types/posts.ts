import type { Timestamp } from "firebase/firestore";
import type { UserType } from "./user";

export type PostLikesType = { uid: string }[];

export type PostCommentType = {
  username: string;
  avatar: string;
  timestamp: Timestamp;
  comment: string;
  commentId: string;
  likes: PostLikesType;
};

export type PostType = {
  photoId: string;
  image: string;
  caption: string;
  username: string;
  comments: PostCommentType[];
  likes: PostLikesType;
  timestamp: Timestamp;
  user: UserType;
};
