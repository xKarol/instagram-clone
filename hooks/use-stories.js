import useFirebaseFetch from "./use-firebase-fetch";
import { db } from "../config/firebase.config";
import { getUserStories } from "../services";

const useStories = (userId) => {
  const response = useFirebaseFetch(() => getUserStories(db, userId));
  return response;
};

export default useStories;
