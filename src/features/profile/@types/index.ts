import type { PostType } from "../../../@types/posts";
import type { UserType } from "../../../@types/user";

export type ProfileType = {
  user: UserType;
  posts: PostType[];
};
