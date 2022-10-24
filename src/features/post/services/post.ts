import {
  getDocs,
  deleteDoc,
  doc,
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  setDoc,
} from "firebase/firestore";
import type {
  Firestore,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { getPhotoComments } from "./comment";
import type { PostType } from "../../../@types/posts";
import { getUserByUsername } from "../../../services";

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

  const photos = (await Promise.all(
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
  )) as PostType[];
  return { photos, lastId: lastVisible };
};

export const deletePost = async (db: Firestore, postId: string) => {
  await deleteDoc(doc(db, "photos", postId));
};

export const getPhotoLikes = async (db: Firestore, postId: string) => {
  const likesDocs = await getDocs(collection(db, "photos", postId, "likes"));
  return likesDocs.docs.map((doc) => doc.data());
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
