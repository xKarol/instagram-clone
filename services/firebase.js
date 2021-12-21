import { db } from "../config/firebase.config";
import { setDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export async function signUpUser(username, fullname, email, password) {
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
  });
  return { createUser, setUser };
}
