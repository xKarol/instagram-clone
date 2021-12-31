import { useState, useEffect } from "react";
import { getUserByUsername, getUserPhotos } from "../services/firebase";

export default function usePhotos(profile) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const user = await getUserByUsername(profile);
      const photos = await getUserPhotos(profile);
      setUser(user);
      setPhotos(photos);
      setLoading(false);
    };
    loadData();
  }, [profile]);

  return { setUser, user, setPhotos, photos, loading };
}
