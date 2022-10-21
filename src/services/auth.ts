import { setDoc, doc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import { auth } from "../config/firebase.config";
import { random } from "../utils";
import { UserType } from "../@types/user";

type SignUpProps = {
  db: Firestore;
  password: string;
} & Pick<UserType, "username" | "fullName" | "email"> &
  Partial<Pick<UserType, "avatar">>;

export const signUpUser = async ({
  db,
  avatar = "",
  username,
  fullName,
  email,
  password,
}: SignUpProps) => {
  const auth = getAuth();
  const createUser = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const setUser = await setDoc(doc(db, "users", createUser.user.uid), {
    username,
    fullName,
    email,
    avatar,
    random: random(1_000_000),
  });
  return { createUser, setUser };
};

export const logOut = async () => await signOut(auth);
