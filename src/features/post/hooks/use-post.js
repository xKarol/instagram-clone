import { db } from "../../../config/firebase.config";
import useFirebaseFetch from "../../../hooks/use-firebase-fetch";
import { getPhotoById } from "../../../services";

const usePost = (id) => {
  const response = useFirebaseFetch(() => getPhotoById(db, id));
  return response;
};

export default usePost;
