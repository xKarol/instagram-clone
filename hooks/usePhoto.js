import { db } from "../config/firebase.config";
import { getPhotoById } from "../services";
import useFirebaseFetch from "./useFirebaseFetch";

const usePhoto = (id) => {
  const response = useFirebaseFetch(() => getPhotoById(db, id));
  return response;
};

export default usePhoto;
