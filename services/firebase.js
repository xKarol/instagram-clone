import { db } from "../config/firebase.config";
import {
  setDoc,
  getDocs,
  getDoc,
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

export async function getUser(username) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const userDoc = await getDocs(q);
  const user = userDoc.docs[0].data();
  return user;
}

export async function getPhotos() {
  const q = query(collection(db, "photos"), orderBy("timestamp", "desc"));
  const photosDocs = await getDocs(q);
  const photos = await Promise.all(
    photosDocs.docs.map(async (docData) => {
      const username = docData.data().username;
      const userData = await getUser(username);
      return {
        user: userData,
        ...docData.data(),
        photoId: docData.id,
      };
    })
  );
  return photos;
}
