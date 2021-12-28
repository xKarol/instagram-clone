import { db } from "../config/firebase.config";
import {
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  limit,
  doc,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { random } from "./utils";

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
    random: random(1000000),
  });
  return { createUser, setUser };
}

export async function logOut() {
  const res = await signOut(auth);
  return { res };
}

export async function getUserMainData(username) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const userDoc = await getDocs(q);
  const user = { ...userDoc.docs[0].data(), uid: userDoc.docs[0].id };
  return user;
}

export async function getUserByUID(uid, extradata = true) {
  const userDoc = await getDoc(doc(db, "users", uid));
  const user = { ...userDoc.data(), uid: userDoc.id };
  if (extradata) {
    const followings = await getUserFollowings(user?.uid);
    const followers = await getUserFollowers(user?.uid);
    return { ...user, followers: followers, followings: followings };
  } else {
    return { ...user };
  }
}

export async function getUserFollowers(uid) {
  const userFollowersDoc = await getDocs(
    collection(db, "users", uid, "followers")
  );
  const followers = userFollowersDoc.docs.map((doc) => ({ ...doc.data() }));
  return followers;
}
export async function getUserFollowings(uid) {
  const userFollowingsDoc = await getDocs(
    collection(db, "users", uid, "followings")
  );
  const followings = userFollowingsDoc.docs.map((doc) => ({ ...doc.data() }));
  return followings;
}

export async function getUserByUsername(username, extradata = true) {
  const user = await getUserMainData(username);
  if (extradata) {
    const followings = await getUserFollowings(user?.uid);
    const followers = await getUserFollowers(user?.uid);
    return { ...user, followers: followers, followings: followings };
  } else {
    return { ...user };
  }
}

export async function getPhotos() {
  const q = query(collection(db, "photos"), orderBy("timestamp", "desc"));
  const photosDocs = await getDocs(q);
  const photos = await Promise.all(
    photosDocs.docs.map(async (docData) => {
      const username = docData.data().username;
      const userData = await getUserByUsername(username, false);
      return {
        user: userData,
        ...docData.data(),
        photoId: docData.id,
      };
    })
  );
  return photos;
}

export async function getProfilesSuggestion() {
  //TODO poprawic pobieranie losowych uzytkownikow
  const rand = random(1000000);
  const q = query(
    collection(db, "users"),
    where("random", ">=", rand),
    orderBy("random"),
    limit(6)
  );
  const profiles = await getDocs(q);
  return profiles.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
}

export const followUser = async (userDocId, docId) => {
  if (userDocId === docId) return;
  await setDoc(doc(db, "users", docId, "followers", userDocId), {
    uid: userDocId,
  });
  await setDoc(doc(db, "users", userDocId, "followings", docId), {
    uid: docId,
  });
};

export const unfollowUser = async (userDocId, docId) => {
  if (userDocId === docId) return;
  await deleteDoc(doc(db, "users", docId, "followers", userDocId));
  await deleteDoc(doc(db, "users", userDocId, "followings", docId));
};
