export type FollowType = { uid: string };

export type UserType = {
  avatar: { src: string; name: string };
  fullName: string;
  username: string;
  email: string;
  uid: string;
  followers?: FollowType[];
  followings?: FollowType[];
};
