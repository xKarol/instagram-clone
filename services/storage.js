import { storage } from "../config/firebase.config";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export const uploadPhoto = async (username, file, fileName) => {
  const name = Date.now() + "_" + fileName;
  const imageRef = ref(storage, `images/${username}/${name}`);
  await uploadString(imageRef, file, "data_url");
  const downloadURL = await getDownloadURL(imageRef);
  return downloadURL;
};
