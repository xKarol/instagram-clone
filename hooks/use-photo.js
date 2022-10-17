import useFirebaseFetch from "./use-firebase-fetch";
import { db } from "../config/firebase.config";
import { getPhotoById } from "../services";

const usePhoto = (id) => {
  const response = useFirebaseFetch(() => getPhotoById(db, id));
  return response;
};

export default usePhoto;
