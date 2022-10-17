import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase.config";
import { getUserByUID } from "../services";

const useAuthListener = () => {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const listener = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userData = await getUserByUID(db, authUser.uid);
        if (!userData) {
          // TODO delete user
        } else {
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
