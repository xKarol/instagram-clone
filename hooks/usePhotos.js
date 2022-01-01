import { useState, useEffect } from "react";
import { getPhotos } from "../services/firebase";

export default function usePhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const photos = await getPhotos();
      setPhotos(photos);
      setLoading(false);
    };
    getData();
  }, []);

  return { photos, loading };
}
