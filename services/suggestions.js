import {
  getDocs,
  limit,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { random } from "../utils";

export const getProfilesSuggestion = async (db, username) => {
  const rand = random(1000000);
  const q = query(
    collection(db, "users"),
    where("random", ">=", rand),
    orderBy("random"),
    limit(5)
  );
  const profiles = await getDocs(q);
  const data = profiles.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
  const response = data.filter(
    (suggestion) => suggestion.username !== username
  );
  return response;
};
