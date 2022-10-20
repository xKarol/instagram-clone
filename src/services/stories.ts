import { getDocs, collection } from "firebase/firestore";
import type { Firestore } from "firebase/firestore";
import { getUserByUID } from "./user";
import { StoryType } from "../features/stories/@types";

export const getUserStories = async (db: Firestore, docId: string) => {
  const storiesDocs = await getDocs(
    collection(db, "users", docId, "followings")
  );
  const stories = await Promise.all(
    storiesDocs.docs.map(async (docData) => {
      const userId = (docData.data() as StoryType).uid;
      const userData = await getUserByUID(db, userId, false);
      return {
        username: userData?.username,
        avatar: userData?.avatar,
        ...docData.data(),
        storyId: docData.id,
      };
    })
  );
  return stories;
};
