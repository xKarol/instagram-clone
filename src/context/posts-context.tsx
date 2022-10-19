import { createContext, useContext, useState } from "react";

type PostsContextType = {
  setPhotos: React.Dispatch<React.SetStateAction<unknown[]>>; //TODO change types
  photos: unknown[];
};

export const PostsContext = createContext<PostsContextType | null>(null);

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
