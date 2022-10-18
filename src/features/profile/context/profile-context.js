import { createContext, useContext } from "react";

const ProfileContext = createContext(null);
export default ProfileContext;

export const useProfileContext = () => useContext(ProfileContext);
