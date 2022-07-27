import { useState, useEffect, useContext } from "react";
import { getProfilesSuggestion } from "../services";
import UserContext from "../context/UserContext";
import { db } from "../config/firebase.config";

export default function useProfilesSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {
    user: { username },
    loggedIn,
  } = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      try {
        setError(false);
        setLoading(true);
        const suggestions = await getProfilesSuggestion(db);
        const data = loggedIn
          ? suggestions.filter((suggestion) => suggestion.username !== username)
          : suggestions;
        setSuggestions(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [loggedIn, username]);

  return { suggestions, loading, error };
}
