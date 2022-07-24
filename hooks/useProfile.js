import { useState, useEffect } from "react";
import { db } from "../config/firebase.config";
import { getUserByUsername, getUserPhotos } from "../services";

export default function useProfile(profile) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [user, setUser] = useState({});
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setError(false);
        setLoading(true);
        const user = await getUserByUsername(db, profile);
        const photos = await getUserPhotos(db, profile);
        setUser(user);
        setPhotos(photos);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [profile]);

  return { setUser, user, setPhotos, photos, loading, error };
}
