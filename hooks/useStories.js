import { db } from "../config/firebase.config";
import { getUserStories } from "../services";
import useFirebaseFetch from "./useFirebaseFetch";

const useStories = (userId) => {
  const response = useFirebaseFetch(() => getUserStories(db, userId));
  return response;
};

export default useStories;
