import type { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useCallback, useRef, useState } from "react";
import { db } from "../../../config/firebase.config";
import { usePostsContext } from "../../../context/posts-context";
import { getPhotos } from "../services";

const usePosts = () => {
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const lastId = useRef<QueryDocumentSnapshot<DocumentData>>(null);
  const isPending = useRef(false);
  const { setPhotos, photos } = usePostsContext();

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

export default usePosts;
