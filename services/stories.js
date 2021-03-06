import {
  getDocs,
  collection,
} from "firebase/firestore";
import { getUserByUID } from "./user";

export const getUserStories = async (db, docId) => {
  const storiesDocs = await getDocs(
    collection(db, "users", docId, "followings")
  );
  const stories = await Promise.all(
    storiesDocs.docs.map(async (docData) => {
      const userId = docData.data().uid;
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
