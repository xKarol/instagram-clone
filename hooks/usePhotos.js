import { useState, useRef, useCallback } from "react";
import { getPhotos } from "../services";
import { useUserContext } from "../context/UserContext";
import { db } from "../config/firebase.config";

export default function usePhotos() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const lastId = useRef(undefined);
  const { setPhotos, photos } = useUserContext();

  const getData = useCallback(async () => {
    try {
      setError(false);
      setLoading(true);
      const { photos, lastId: last } = await getPhotos(db, 5, lastId.current);
      setPhotos((prev) => [...prev, ...photos]);
      lastId.current = last;
      if (!last) {
        setHasMore(false);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [setPhotos]);

  return { getData, photos, loading, error, hasMore };
}
