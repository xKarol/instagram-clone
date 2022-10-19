export type FollowType = { uid: string };

export type UserType = {
  // random: number;
  // avatarFileName: string;
  avatar: string;
  fullName: string;
  username: string;
  email: string;
  uid: string;
  followers?: FollowType[];
  followings?: FollowType[];
};
