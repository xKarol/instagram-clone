import {
  getDoc,
  getDocs,
  doc,
  collection,
  query,
  where,
  setDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { getPhotoComments, getPhotoLikes } from "./post";

export const getUserMainData = async (db, username) => {
  if (!username) return;
  const q = query(collection(db, "users"), where("username", "==", username));
  const userDoc = await getDocs(q);
  const user = { ...userDoc?.docs[0]?.data(), uid: userDoc?.docs[0]?.id };
  return user;
};

export const getUserByUID = async (db, uid, extradata = true) => {
  if (!uid) return;
  const userDoc = await getDoc(doc(db, "users", uid));
  const user = { ...userDoc.data(), uid: userDoc.id };
  if (extradata) {
    const followings = await getUserFollowings(db, user?.uid);
    const followers = await getUserFollowers(db, user?.uid);
    return { ...user, followers: followers, followings: followings };
  } else {
    return { ...user };
  }
};

export const getUserFollowers = async (db, uid) => {
  if (!uid) return;
  const userFollowersDoc = await getDocs(
    collection(db, "users", uid, "followers")
  );
  const followers = userFollowersDoc.docs.map((doc) => ({ ...doc.data() }));
  return followers;
};

export const getUserFollowings = async (db, uid) => {
  if (!uid) return;
  const userFollowingsDoc = await getDocs(
    collection(db, "users", uid, "followings")
  );
  const followings = userFollowingsDoc.docs.map((doc) => ({ ...doc.data() }));
  return followings;
};

export const getUserByUsername = async (db, username, extradata = true) => {
  const user = await getUserMainData(db, username);
  if (!user?.uid) return;
  if (extradata) {
    const followings = await getUserFollowings(db, user?.uid);
    const followers = await getUserFollowers(db, user?.uid);
    return { ...user, followers: followers, followings: followings };
  } else {
    return { ...user };
  }
};

export const followUser = async (db, userDocId, docId) => {
  if (userDocId === docId) return;
  await setDoc(doc(db, "users", docId, "followers", userDocId), {
    uid: userDocId,
  });
  await setDoc(doc(db, "users", userDocId, "followings", docId), {
    uid: docId,
  });
};

export const unfollowUser = async (db, userDocId, docId) => {
  if (userDocId === docId) return;
  await deleteDoc(doc(db, "users", docId, "followers", userDocId));
  await deleteDoc(doc(db, "users", userDocId, "followings", docId));
};

export const getUserPhotos = async (db, username) => {
  if (!username?.length) return;
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
