import React, { createContext, useContext } from "react";
import useAuthListener from "../hooks/use-auth";

type UserContextType = ReturnType<typeof useAuthListener>;

export const UserContext = createContext<UserContextType | null>(null);
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
