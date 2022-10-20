import type { Firestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import type { UserType } from "../../../@types/user";
import { random } from "../../../utils";

type ProfileSuggestionType = UserType & { docId: string };

export const getProfilesSuggestion = async (
  db: Firestore,
  username: string
) => {
  const rand = random(1_000_000);
  const q = query(
    collection(db, "users"),
    where("random", ">=", rand),
    orderBy("random"),
    limit(5)
  );
  const profiles = await getDocs(q);
  const data = profiles.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  })) as ProfileSuggestionType[];
  const response = data.filter(
    (suggestion) => suggestion.username !== username
  );
  return response;
};
