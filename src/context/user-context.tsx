import React, { createContext, useContext } from "react";
import type { UserType } from "../@types/user";
import useAuthListener from "../hooks/use-auth";

type ContextProps = {
  setUser: React.Dispatch<
    React.SetStateAction<UserType | Record<string, unknown>>
  >;
  user: UserType | Record<string, unknown>;
  pending: boolean;
  loggedIn: boolean;
};

export const UserContext = createContext<ContextProps | null>(null);
export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }: React.PropsWithChildren) => {
  const { setUser, user, pending, loggedIn } = useAuthListener();

  return (
    <UserContext.Provider value={{ setUser, user, pending, loggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
