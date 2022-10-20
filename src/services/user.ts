import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import type { Firestore } from "firebase/firestore";
import { getPhotoComments, getPhotoLikes } from "./post";
import { deleteAvatarFromStorage, uploadAvatar } from "./storage";
import type { FollowType, UserType } from "../@types/user";

export const getAllUsers = async (db: Firestore) => {
  const usersDoc = await getDocs(collection(db, "users"));
  const users = usersDoc.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));
  return users;
};

export const getUserMainData = async (db: Firestore, username: string) => {
  const q = query(collection(db, "users"), where("username", "==", username));
  const userDoc = await getDocs(q);
  const user = {
    ...userDoc?.docs[0]?.data(),
    uid: userDoc?.docs[0]?.id,
  } as UserType;
  return user;
};

export const getUserByUID = async (
  db: Firestore,
  uid: string,
  extradata = true
): Promise<UserType> => {
  const userDoc = await getDoc(doc(db, "users", uid));
  const user = { ...userDoc.data(), uid: userDoc.id } as UserType;
  if (extradata) {
    const followings = await getUserFollowings(db, user?.uid);
    const followers = await getUserFollowers(db, user?.uid);
    return { ...user, followers, followings };
  }
  return { ...user };
};

export const getUserByUsername = async (
  db: Firestore,
  username: string,
  extradata = true
): Promise<UserType> => {
  const user = await getUserMainData(db, username);
  if (extradata) {
    const followings = await getUserFollowings(db, user?.uid);
    const followers = await getUserFollowers(db, user?.uid);
    return { ...user, followers: followers, followings: followings };
  }
  return { ...user };
};

export const getUserFollowers = async (db: Firestore, uid: string) => {
  const userFollowersDoc = await getDocs(
    collection(db, "users", uid, "followers")
  );
  const followers = userFollowersDoc.docs.map((doc) => ({ ...doc.data() }));
  return followers as FollowType[];
};

export const getUserFollowings = async (db: Firestore, uid: string) => {
  const userFollowingsDoc = await getDocs(
    collection(db, "users", uid, "followings")
  );
  const followings = userFollowingsDoc.docs.map((doc) => ({ ...doc.data() }));
  return followings as FollowType[];
};

export const followUser = async (
  db: Firestore,
  userDocId: string,
  followDocId: string
) => {
  if (userDocId === followDocId) return;
  await setDoc(doc(db, "users", followDocId, "followers", userDocId), {
    uid: userDocId,
  });
  await setDoc(doc(db, "users", userDocId, "followings", followDocId), {
    uid: followDocId,
  });
};

export const unfollowUser = async (
  db: Firestore,
  userDocId: string,
  followDocId: string
) => {
  if (userDocId === followDocId) return;
  await deleteDoc(doc(db, "users", followDocId, "followers", userDocId));
  await deleteDoc(doc(db, "users", userDocId, "followings", followDocId));
};

export const getUserPhotos = async (db: Firestore, username: string) => {
  const q = query(
    collection(db, "photos"),
    where("username", "==", username),
    orderBy("timestamp", "desc")
  );
  const photosDocs = await getDocs(q);
  const photos = await Promise.all(
    photosDocs.docs.map(async (docData) => {
      const comments = await getPhotoComments(db, docData.id);
      const likes = await getPhotoLikes(db, docData.id);
      return {
        ...docData.data(),
        photoId: docData.id,
        comments: comments,
        likes: likes,
      };
    })
  );
  return photos;
};

type UpdateUserAvatarProps = {
  db: Firestore;
  fileName: string;
  oldAvatarName: string;
  userId: string;
  file: File;
};

export const updateUserAvatar = async ({
  db,
  fileName,
  oldAvatarName,
  userId,
  file,
}: UpdateUserAvatarProps) => {
  const { downloadURL, fileName: uploadedFileName } = await uploadAvatar(
    file,
    fileName
  );
  await updateDoc(doc(db, "users", userId), {
    avatar: downloadURL,
    avatarFileName: uploadedFileName,
  });
  if (oldAvatarName) {
    await deleteAvatarFromStorage(oldAvatarName);
  }
  return downloadURL;
};
