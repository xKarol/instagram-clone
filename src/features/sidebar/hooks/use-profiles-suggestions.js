import { db } from "../../../config/firebase.config";
import { useUserContext } from "../../../context/user-context";
import useFirebaseFetch from "../../../hooks/use-firebase-fetch";
import { getProfilesSuggestion } from "../services";

const useProfilesSuggestions = () => {
  const {
    user: { username },
  } = useUserContext();

  return useFirebaseFetch(() => getProfilesSuggestion(db, username));
};

export default useProfilesSuggestions;
