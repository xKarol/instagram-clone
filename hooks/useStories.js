import { useState, useEffect } from "react";
import { db } from "../config/firebase.config";
import { getUserStories } from "../services/firebase";

export default function useStories(user) {
  const [loading, setLoading] = useState(false);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (!user.uid) return;
      !stories?.length && setLoading(true);
      const storiesData = await getUserStories(db, user?.uid);
      setStories(storiesData);
      setLoading(false);
    };
    getData();
  }, [user?.followings]);

  return { stories, loading };
}
