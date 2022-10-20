import useFirebaseFetch from "../../../hooks/use-firebase-fetch";
import { db } from "../../../config/firebase.config";
import { getUserStories } from "../services";
import { StoryType } from "../@types";

const useStories = (userId: string) => {
  return useFirebaseFetch<StoryType[]>(() => getUserStories(db, userId));
};

export default useStories;
