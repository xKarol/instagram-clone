import { useEffect, useState } from "react";
import { getPhotoById } from "../services/firebase";

export default function usePhoto(id) {
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState(false);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const photo = await getPhotoById(id);
      setComments(photo?.comments);
      setLikes(photo?.likes);
      setPhoto(photo);
      setLoading(false);
    };
    getData();
  }, []);

  return { setPhoto, photo, loading, setLikes, likes, comments, setComments };
}
