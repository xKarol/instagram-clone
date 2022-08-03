import { useEffect, useState } from "react";
import { db } from "../config/firebase.config";
import { getPhotoById } from "../services";

const usePhoto = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [photo, setPhoto] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (!id) return;
      try {
        setError(false);
        setLoading(true);
        const photo = await getPhotoById(db, id);
        setPhoto(photo);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  return {
    photo,
    loading,
    error,
  };
}

export default usePhoto;

