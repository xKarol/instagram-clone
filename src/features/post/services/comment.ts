import {
  addDoc,
  setDoc,
  getDocs,
  deleteDoc,
  doc,
  collection,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import type { Firestore } from "firebase/firestore";
import { getUserByUsername } from "../../../services";
import type { PostCommentType, PostLikesType } from "../../../@types/posts";

export const getCommentLikes = async (
  db: Firestore,
  postId: string,
  commentId: string
) => {
  const commentsDocs = await getDocs(
    collection(db, "photos", postId, "comments", commentId, "likes")
  );
  return commentsDocs.docs.map((doc) => doc.data()) as PostLikesType[];
};

export const getPhotoComments = async (db: Firestore, postId: string) => {
  const q = query(
    collection(db, "photos", postId, "comments"),
    orderBy("timestamp", "desc")
  );
  const commentsDocs = await getDocs(q);
  const comments = (await Promise.all(
    commentsDocs.docs.map(async (docData) => {
      const username = docData.data().username as string;
      const userData = await getUserByUsername(db, username, false);
      const commentLikes = await getCommentLikes(db, postId, docData.id);
      return {
        avatar: userData.avatar,
        commentId: docData.id,
        likes: commentLikes,
        ...docData.data(),
      };
    })
  )) as unknown;
  return comments as PostCommentType[];
};

export const addComment = async (
  db: Firestore,
  comment: string,
  postId: string,
  username: string
) => {
  if (comment.length === 0) return;
  const response = await addDoc(collection(db, "photos", postId, "comments"), {
    comment,
    username,
    timestamp: serverTimestamp(),
  });
  return response;
};

export const likeComment = async (
  db: Firestore,
  postId: string,
  commentId: string,
  userId: string,
  liked: boolean
) => {
  !liked
    ? await setDoc(
        doc(db, "photos", postId, "comments", commentId, "likes", userId),
        {
          uid: userId,
        }
      )
    : await deleteDoc(
        doc(db, "photos", postId, "comments", commentId, "likes", userId)
      );
};
