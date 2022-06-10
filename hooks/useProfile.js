import { useState, useEffect } from "react";
import { db } from "../config/firebase.config";
import { getUserByUsername, getUserPhotos } from "../services/firebase";

export default function usePhotos(profile) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const user = await getUserByUsername(db, profile);
      const photos = await getUserPhotos(db, profile);
      setUser(user);
      setPhotos(photos);
      setLoading(false);
    };
    loadData();
  }, [profile]);

  return { setUser, user, setPhotos, photos, loading };
}
