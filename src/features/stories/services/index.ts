import { getDocs, collection } from "firebase/firestore";
import type { Firestore } from "firebase/firestore";
import type { StoryType } from "../@types";
import { getUserByUID } from "../../../services/user";

export const getUserStories = async (
  db: Firestore,
  docId: string
): Promise<StoryType[]> => {
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
        uid: userId,
        storyId: docData.id,
      } as unknown;
    })
  );
  return stories as StoryType[];
};
