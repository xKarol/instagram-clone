import { useState, useEffect } from "react";
import { getPhotos } from "../services/firebase";

export default function usePhotos() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const photos = await getPhotos();
      setPhotos(photos);
    };
    getData();
  }, []);

  return { photos };
}
