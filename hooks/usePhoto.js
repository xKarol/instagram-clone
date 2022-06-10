import { useEffect, useState } from "react";
import { db } from "../config/firebase.config";
import { getPhotoById } from "../services/firebase";

export default function usePhoto(id) {
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(false);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (!id) return;
      setLoading(true);
      const photo = await getPhotoById(db, id);
      setComments(photo?.comments);
      setLikes(photo?.likes);
      setPhoto(photo);
      setLoading(false);
    };
    getData();
  }, [id]);

  return { setPhoto, photo, loading, setLikes, likes, comments, setComments };
}
