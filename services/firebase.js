import {
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  limit,
  doc,
  collection,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { random } from "./utils";

export const signUpUser = async (db, username, fullname, email, password) => {
  const auth = getAuth();
  const createUser = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const setUser = await setDoc(doc(db, "users", createUser.user.uid), {
    username: username,
    fullName: fullname,
    email: email,
    random: random(1000000),
  });
  return { createUser, setUser };
};

export const logOut = async () => {
  const res = await signOut(auth);
  return { res };
};

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

export const getCommentLikes = async (db, postId, commentId) => {
  const commentsDocs = await getDocs(
    collection(db, "photos", postId, "comments", commentId, "likes")
  );
  return commentsDocs.docs.map((doc) => doc.data());
};

export const getPhotoComments = async (db, postId) => {
  const q = query(
    collection(db, "photos", postId, "comments"),
    orderBy("timestamp", "desc")
  );
  const commentsDocs = await getDocs(q);
  const comments = await Promise.all(
    commentsDocs.docs.map(async (docData) => {
      const username = docData.data().username;
      const userData = await getUserByUsername(db, username, false);
      const commentLikes = await getCommentLikes(db, postId, docData.id);
      return {
        username: userData.username,
        avatar: userData.avatar,
        ...docData.data(),
        commentId: docData.id,
        likes: commentLikes,
      };
    })
  );
  return comments;
};

export const getPhotoLikes = async (db, postId) => {
  const likesDocs = await getDocs(collection(db, "photos", postId, "likes"));
  return likesDocs.docs.map((doc) => doc.data());
};

export const getPhotos = async (db) => {
  const q = query(collection(db, "photos"), orderBy("timestamp", "desc"));
  const photosDocs = await getDocs(q);
  const photos = await Promise.all(
    photosDocs.docs.map(async (docData) => {
      const username = docData.data().username;
      const userData = await getUserByUsername(db, username, false);
      const comments = await getPhotoComments(db, docData.id);
      const likes = await getPhotoLikes(db, docData.id);
      return {
        user: userData,
        ...docData.data(),
        photoId: docData.id,
        comments: comments,
        likes: likes,
      };
    })
  );
  return photos;
};

export const getPhotoById = async (db, id) => {
  const photoDoc = await getDoc(doc(db, "photos", id));
  if (!photoDoc.exists()) return null;
  const username = photoDoc.data().username;
  const userData = await getUserByUsername(db, username, false);
  const comments = await getPhotoComments(db, photoDoc.id);
  const likes = await getPhotoLikes(db, photoDoc.id);
  const photoData = {
    user: userData,
    ...photoDoc.data(),
    photoId: photoDoc.id,
    comments: comments,
    likes: likes,
  };
  return photoData;
};

export const getProfilesSuggestion = async (db) => {
  const rand = random(1000000);
  const q = query(
    collection(db, "users"),
    where("random", ">=", rand),
    orderBy("random"),
    limit(6)
  );
  const profiles = await getDocs(q);
  return profiles.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
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

export const getUserStories = async (db, docId) => {
  const storiesDocs = await getDocs(
    collection(db, "users", docId, "followings")
  );
  const stories = await Promise.all(
    storiesDocs.docs.map(async (docData) => {
      const userId = docData.data().uid;
      const userData = await getUserByUID(db, userId, false);
      return {
        username: userData?.username,
        avatar: userData?.avatar,
        ...docData.data(),
        storyId: docData.id,
      };
    })
  );
  return stories;
};

export const addComment = async (db, comment, postId, username) => {
  if (!comment.length) return;
  return await addDoc(collection(db, "photos", postId, "comments"), {
    comment: comment,
    username: username,
    timestamp: serverTimestamp(),
  });
};

export const likePost = async (db, postId, userId, liked) => {
  if (!liked) {
    setDoc(doc(db, "photos", postId, "likes", userId), {
      uid: userId,
    });
  } else {
    deleteDoc(doc(db, "photos", postId, "likes", userId));
  }
};

export const likeComment = async (db, postId, commentId, userId, liked) => {
  if (!liked) {
    setDoc(doc(db, "photos", postId, "comments", commentId, "likes", userId), {
      uid: userId,
    });
  } else {
    deleteDoc(
      doc(db, "photos", postId, "comments", commentId, "likes", userId)
    );
  }
};

export const getUserPhotos = async (db, username) => {
  if (!username.length) return;
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

export const deletePost = async (db, postId) => {
  return await deleteDoc(doc(db, "photos", postId));
};
