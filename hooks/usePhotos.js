import { useState, useEffect, useContext } from "react";
import { getPhotos } from "../services";
import UserContext from "../context/UserContext";
import { db } from "../config/firebase.config";

export default function usePhotos() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { setPhotos, photos } = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      try {
        setError(false);
        setLoading(true);
        const photos = await getPhotos(db);
        setPhotos(photos);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [setPhotos]);

  return { photos, loading, error };
}
