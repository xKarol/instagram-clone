import { getProfilesSuggestion } from "../services";
import { useUserContext } from "../context/UserContext";
import { db } from "../config/firebase.config";
import useFirebaseFetch from "./useFirebaseFetch";

const useProfilesSuggestions = () => {
  const {
    user: { username },
  } = useUserContext();

  const response = useFirebaseFetch(() => getProfilesSuggestion(db, username));
  return response;
};

export default useProfilesSuggestions;
