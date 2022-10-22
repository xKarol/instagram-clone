import useFirebaseFetch from "../../../hooks/use-firebase-fetch";
import { db } from "../../../config/firebase.config";
import { getUserByUsername, getUserPhotos } from "../../../services";
import type { ProfileType } from "../@types";

const callback = async (profile: string) => {
  const user = await getUserByUsername(db, profile);
  const posts = await getUserPhotos(db, profile);
  return { user, posts };
};

const useProfile = (profile: string) => {
  const response = useFirebaseFetch<ProfileType>(() => callback(profile));
  return response;
};

export default useProfile;
