import { db } from "../../../config/firebase.config";
import useFirebaseFetch from "../../../hooks/use-firebase-fetch";
import { getPhotoById } from "../../../services";

const usePost = (postId: string) => {
  const response = useFirebaseFetch(() => getPhotoById(db, postId));
  return response;
};

export default usePost;
