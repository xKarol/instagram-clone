import { useState, useEffect, useContext } from "react";
import { getProfilesSuggestion } from "../services/firebase";
import UserContext from "../context/UserContext";

export default function useProfilesSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, loggedIn } = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const suggestions = await getProfilesSuggestion();

      setSuggestions(
        loggedIn
          ? suggestions
              .filter((suggestion) => suggestion.username !== user?.username)
              .slice(0, 5)
          : suggestions
      );
      setLoading(false);
    };
    getData();
  }, [user.uid]);

  return { setSuggestions, suggestions, loading };
}
