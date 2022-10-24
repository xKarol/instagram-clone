import { useCallback, useState } from "react";
import type { UserType } from "../@types/user";
import { db } from "../config/firebase.config";
import { followUser, getUserByUID, unfollowUser } from "../services";

type Props = {
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  isFollowed: boolean;
  userId: string;
  followId: string;
};

const useFollow = ({ setUser, isFollowed, userId, followId }: Props) => {
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
