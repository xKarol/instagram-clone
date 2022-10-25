import {
  getDownloadURL,
  ref,
  deleteObject,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../config/firebase.config";

export const uploadPhoto = async (username: string, file: File) => {
  const name = `${Date.now() + Math.random()}_${file.name}`;
  const imageRef = ref(storage, `images/${username}/${name}`);
  await uploadBytes(imageRef, file);
  const downloadURL = await getDownloadURL(imageRef);
  return { downloadURL, fileName: name };
};

export const uploadAvatar = async (file: File, fileName: string) => {
  const name = `${Date.now()}_${fileName}`;
  const imageRef = ref(storage, `avatars/${name}`);
  await uploadBytes(imageRef, file);
  const downloadURL = await getDownloadURL(imageRef);
  return { downloadURL, fileName: name };
};

export const deleteAvatarFromStorage = async (fileName: string) => {
  const photoRef = ref(storage, `avatars/${fileName}`);
  await deleteObject(photoRef);
};

export const deletePhotoFromStorage = async (
  username: string,
  fileName: string
) => {
  const photoRef = ref(storage, `images/${username}/${fileName}`);
  await deleteObject(photoRef);
};
