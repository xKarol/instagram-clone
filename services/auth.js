import { setDoc, doc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase.config";

export const signUpUser = async (db, username, fullname, email, password) => {
  const auth = getAuth();
  const createUser = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const setUser = await setDoc(doc(db, "users", createUser.user.uid), {
    username: username,
    fullName: fullname,
    email: email,
    random: random(1000000),
  });
  return { createUser, setUser };
};

export const logOut = async () => {
  const res = await signOut(auth);
  return { res };
};
