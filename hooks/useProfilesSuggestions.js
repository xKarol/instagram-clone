import { useState, useEffect, useContext } from "react";
import { getProfilesSuggestion } from "../services/firebase";
import UserContext from "../context/UserContext";
import { db } from "../config/firebase.config";

export default function useProfilesSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, loggedIn } = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const suggestions = await getProfilesSuggestion(db);
      setSuggestions(
        loggedIn
          ? suggestions.filter(
              (suggestion) => suggestion.username !== user?.username
            )
          : suggestions
      );
      setLoading(false);
    };
    getData();
  }, [user.uid, loggedIn, user?.username]);

  return { setSuggestions, suggestions, loading };
}
