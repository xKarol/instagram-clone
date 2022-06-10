import { useState, useEffect, useContext } from "react";
import { getPhotos } from "../services/firebase";
import UserContext from "../context/UserContext";
import { db } from "../config/firebase.config";

export default function usePhotos() {
  const [loading, setLoading] = useState(true);
  const { setPhotos, photos } = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const photos = await getPhotos(db);
      setPhotos(photos);
      setLoading(false);
    };
    getData();
  }, [setPhotos]);

  return { photos, loading };
}
