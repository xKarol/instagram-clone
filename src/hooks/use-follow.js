import { useCallback, useState } from "react";
import { db } from "../config/firebase.config";
import { followUser, getUserByUID, unfollowUser } from "../services";

const useFollow = ({ setUser, isFollowed, userId, followId }) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleFollow = useCallback(async () => {
    try {
      if (pending) return;
      setPending(true);
      !isFollowed
        ? await followUser(db, userId, followId)
        : await unfollowUser(db, userId, followId);
      const userData = await getUserByUID(db, userId, true);
      setUser(userData);
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  }, [setUser, isFollowed, followId, pending, userId]);

  return { handleFollow, error, pending };
};

export default useFollow;
