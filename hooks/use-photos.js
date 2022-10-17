import { useState, useRef, useCallback } from "react";
import { getPhotos } from "../services";
import { useUserContext } from "../context/user-context";
import { db } from "../config/firebase.config";

const usePhotos = () => {
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const lastId = useRef();
  const isPending = useRef(false);
  const { setPhotos, photos } = useUserContext();

  const getData = useCallback(async () => {
    try {
      if (isPending.current) return;
      isPending.current = true;
      setError(false);
      const { photos, lastId: last } = await getPhotos({
        db,
        max: 5,
        startId: lastId.current,
      });
      setPhotos((prev) => [...prev, ...photos]);
      lastId.current = last;
      if (!last) {
        setHasMore(false);
      }
    } catch {
      setError(true);
    } finally {
      isPending.current = false;
    }
  }, [setPhotos]);

  return { getData, photos, loading: isPending.current, error, hasMore };
};

export default usePhotos;
