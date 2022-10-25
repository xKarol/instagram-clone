import type { UserType } from "../../../@types/user";

export type StoryType = {
  storyId: string;
} & Pick<UserType, "avatar" | "username" | "uid">;
