import { useState, useEffect } from "react";
import { db, auth } from "../config/firebase.config";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function useAuthListener() {
  const [user, setUser] = useState({ loggedIn: false, pending: true });

  useEffect(() => {
    const listener = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const docSnap = await getDoc(doc(db, "users", authUser.uid));
        const userData = docSnap.data();
        if (!userData) {
          // TODO delete user
        } else {
          setUser({
            loggedIn: true,
            pending: false,
            uid: authUser.uid,
            ...userData,
          });
        }
      } else {
        setUser({ loggedIn: false, pending: false });
      }
    });

    return () => listener();
  }, []);

  return { setUser, user };
}
