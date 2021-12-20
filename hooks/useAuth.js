import { useState, useEffect } from "react";
import { db } from "../config/firebase.config";
import { getDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default function useAuthListener() {
  const [user, setUser] = useState({ loggedIn: false });

  useEffect(() => {
    const auth = getAuth();
    const listener = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        const userData = docSnap.data();
        if (!userData) {
          // TODO delete user
        } else {
          setUser({ loggedIn: true, uid: user.uid, ...userData });
        }
      }
    });

    return () => listener();
  }, []);

  return { user };
}
