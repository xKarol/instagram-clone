import {
  getDownloadURL,
  ref,
  deleteObject,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../config/firebase.config";

export const uploadPhoto = async (username, file) => {
  const name = Date.now() + "_" + file.filename;
  const imageRef = ref(storage, `images/${username}/${name}`);
  await uploadBytes(imageRef, file);
  const downloadURL = await getDownloadURL(imageRef);
  return { downloadURL };
};

export const uploadAvatar = async (file, fileName) => {
  const name = Date.now() + "_" + fileName;
  const imageRef = ref(storage, `avatars/${name}`);
  await uploadBytes(imageRef, file);
  const downloadURL = await getDownloadURL(imageRef);
  return { downloadURL, fileName: name };
};

export const deleteAvatarFromStorage = async (fileName) => {
  const photoRef = ref(storage, `avatars/${fileName}`);
  return await deleteObject(photoRef);
};

export const deletePhotoFromStorage = async (username, fileName) => {
  const photoRef = ref(storage, `images/${username}/${fileName}`);
  return await deleteObject(photoRef);
};