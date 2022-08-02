import { useState, useEffect } from "react";
import { db } from "../config/firebase.config";
import { getUserStories } from "../services";

export default function useStories(userId, reload) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (!userId) return;
      try {
        if (!stories.length) {
          setLoading(true);
        }
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
  }, [userId, reload, stories.length]);

  return { stories, loading, error };
}
