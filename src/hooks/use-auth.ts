import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import type { UserType } from "../@types/user";
import { auth, db } from "../config/firebase.config";
import { getUserByUID } from "../services";

const useAuthListener = () => {
  const [user, setUser] = useState<UserType | Record<string, undefined>>({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const listener = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userData = await getUserByUID(db, authUser.uid);
        if (userData) {
          setUser(userData);
          setLoggedIn(true);
          setPending(false);
        }
      } else {
        setLoggedIn(false);
        setPending(false);
        setUser({});
      }
    });
    return () => listener();
  }, []);

  return { setUser, user, pending, loggedIn };
};

export default useAuthListener;
