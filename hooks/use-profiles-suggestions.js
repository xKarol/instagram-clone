import useFirebaseFetch from "./use-firebase-fetch";
import { getProfilesSuggestion } from "../services";
import { useUserContext } from "../context/user-context";
import { db } from "../config/firebase.config";

const useProfilesSuggestions = () => {
  const {
    user: { username },
  } = useUserContext();

  const response = useFirebaseFetch(() => getProfilesSuggestion(db, username));
  return response;
};

export default useProfilesSuggestions;
