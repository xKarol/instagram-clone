import { createContext, useContext, useState } from "react";
import type { PostType } from "../@types/posts";

type PostsContextType = {
  setPhotos: React.Dispatch<React.SetStateAction<PostType[]>>;
  photos: PostType[];
};

export const PostsContext = createContext<PostsContextType>(null);

export const usePostsContext = () => useContext(PostsContext);

const PostsProvider = ({ children }: React.PropsWithChildren) => {
  const [photos, setPhotos] = useState([]);

  return (
    <PostsContext.Provider value={{ photos, setPhotos }}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsProvider;
