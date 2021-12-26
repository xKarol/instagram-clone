import { db } from "../config/firebase.config";
import {
  setDoc,
  getDocs,
  doc,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
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

export async function getPhotos(username) {
  //TODO pobieranie zdjec obserwujacych
  const q = query(
    collection(db, "photos"),
    where("username", "==", username),
    orderBy("timestamp", "desc")
  );
  const photosDocs = await getDocs(q);
  const photos = photosDocs.docs.map((doc) => doc.data());
  return photos;
}
