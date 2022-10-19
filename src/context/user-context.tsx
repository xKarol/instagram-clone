import React, { createContext, useContext, useState } from "react";
import type { UserType } from "../@types/user";
import useAuthListener from "../hooks/use-auth";

type ContextProps = {
  setUser: React.Dispatch<
    React.SetStateAction<UserType | Record<string, unknown>>
  >;
  setPhotos: React.Dispatch<React.SetStateAction<unknown[]>>; //TODO change types
  photos: unknown[];
  user: UserType | Record<string, unknown>;
  pending: boolean;
  loggedIn: boolean;
};

export const UserContext = createContext<ContextProps | null>(null);
export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
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
