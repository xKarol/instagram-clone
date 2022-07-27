import { useEffect, useState } from "react";
import { db } from "../config/firebase.config";
import { getPhotoById } from "../services";

export default function usePhoto(id) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [photo, setPhoto] = useState(false);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (!id) return;
      try {
        setError(false);
        setLoading(true);
        const photo = await getPhotoById(db, id);
        setComments(photo?.comments);
        setLikes(photo?.likes);
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
    setPhoto,
    photo,
    loading,
    error,
    setLikes,
    likes,
    comments,
    setComments,
  };
}
