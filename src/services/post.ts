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
  where,
} from "firebase/firestore";
import type { Firestore } from "firebase/firestore";
import { getUserByUsername } from "./user";
import type { PostType } from "../@types/posts";
import { getPhotoComments, getPhotoLikes } from "../features/post/services";

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
  return photoData as PostType;
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
