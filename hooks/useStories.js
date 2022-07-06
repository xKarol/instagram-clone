import { useState, useEffect } from "react";
import { db } from "../config/firebase.config";
import { getUserStories } from "../services/firebase";

export default function useStories(userId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (!userId || stories.length) return;
      try {
        setLoading(true);
        setError(false);
        const storiesData = await getUserStories(db, userId);
        setStories(storiesData);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [userId, stories]);

  return { stories, loading, error };
}
