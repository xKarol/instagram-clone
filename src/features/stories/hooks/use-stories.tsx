import useFirebaseFetch from "../../../hooks/use-firebase-fetch";
import { db } from "../../../config/firebase.config";
import { getUserStories } from "../../../services";
import { StoryType } from "../@types";

const useStories = (userId: number) => {
  const response = useFirebaseFetch<StoryType[]>(
    () => getUserStories(db, userId) as Promise<StoryType[]> //TODO remove 'as' after type services folder
  );
  return response;
};

export default useStories;
