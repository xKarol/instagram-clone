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
  where,
} from "firebase/firestore";
import type {
  Firestore,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { getUserByUsername } from "./user";
import type { PostCommentType, PostLikesType, PostType } from "../@types/posts";

type GetPhotosProps = {
  db: Firestore;
  max: number;
  startId: QueryDocumentSnapshot<DocumentData>;
};

export const getPhotos = async ({ db, max = 15, startId }: GetPhotosProps) => {
  const q = !startId
    ? query(collection(db, "photos"), orderBy("timestamp", "desc"), limit(max))
    : query(
        collection(db, "photos"),
        orderBy("timestamp", "desc"),
        startAfter(startId),
        limit(max)
      );

  const photosDocs = await getDocs(q);
  const lastVisible = photosDocs.docs[photosDocs.docs.length - 1];

  const photos = await Promise.all(
    photosDocs.docs.map(async (docData) => {
      const username = docData.data().username as string;
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

export const getPhotoLikes = async (db: Firestore, postId: string) => {
  const likesDocs = await getDocs(collection(db, "photos", postId, "likes"));
  return likesDocs.docs.map((doc) => doc.data());
};

export const getPhotoById = async (db: Firestore, postId: string) => {
  const photoDoc = await getDoc(doc(db, "photos", postId));
  if (!photoDoc.exists()) return null;
  const username = photoDoc.data().username as string;
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

export const addComment = async (
  db: Firestore,
  comment: string,
  postId: string,
  username: string
) => {
  if (comment.length === 0) return;
  await addDoc(collection(db, "photos", postId, "comments"), {
    comment,
    username,
    timestamp: serverTimestamp(),
  });
};

export const likePost = async (
  db: Firestore,
  postId: string,
  userId: string,
  liked: boolean
) => {
  !liked
    ? await setDoc(doc(db, "photos", postId, "likes", userId), {
        uid: userId,
      })
    : await deleteDoc(doc(db, "photos", postId, "likes", userId));
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

export const deletePost = async (db: Firestore, postId: string) => {
  await deleteDoc(doc(db, "photos", postId));
};

type CreatePostProps = {
  db: Firestore;
  username: string;
  imageURL: string;
  caption: string;
};

export const createPost = async ({
  db,
  username,
  imageURL,
  caption,
}: CreatePostProps) => {
  const data = await addDoc(collection(db, "photos"), {
    image: imageURL,
    username,
    caption,
    timestamp: serverTimestamp(),
  });
  return data;
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
  return photos as PostType[];
};
