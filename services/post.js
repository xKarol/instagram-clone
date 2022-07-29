import {
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  collection,
  query,
  orderBy,
  serverTimestamp,
  startAfter,
  limit,
} from "firebase/firestore";
import { getUserByUsername } from "./user";

export const getPhotos = async (db, max = 15, startId) => {
  let q;
  if (!startId) {
    q = query(
      collection(db, "photos"),
      orderBy("timestamp", "desc"),
      limit(max)
    );
  } else {
    q = query(
      collection(db, "photos"),
      orderBy("timestamp", "desc"),
      startAfter(startId),
      limit(max)
    );
  }

  const photosDocs = await getDocs(q);
  const lastVisible = photosDocs.docs[photosDocs.docs.length - 1];

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
  return { photos, lastId: lastVisible };
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

export const deletePost = async (db, postId) => {
  return await deleteDoc(doc(db, "photos", postId));
};
