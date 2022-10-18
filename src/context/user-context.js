import { createContext, useContext, useState } from "react";
import useAuthListener from "../hooks/use-auth";

export const UserContext = createContext(null);
export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const { setUser, user, pending, loggedIn } = useAuthListener();
  const [photos, setPhotos] = useState([]);

  return (
    <UserContext.Provider
      value={{ setUser, setPhotos, photos, user, pending, loggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
