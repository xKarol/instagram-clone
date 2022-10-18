import useFirebaseFetch from "./use-firebase-fetch";
import { db } from "../config/firebase.config";
import { getUserByUsername, getUserPhotos } from "../services";

const callback = async (profile) => {
  const user = await getUserByUsername(db, profile);
  const photos = await getUserPhotos(db, profile);
  return { user, photos };
};

const useProfile = (profile) => {
  const response = useFirebaseFetch(() => callback(profile));
  return response;
};

export default useProfile;
