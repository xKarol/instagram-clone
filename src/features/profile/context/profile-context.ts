import { createContext, useContext } from "react";
import type { ProfileType } from "../@types";

type ProfileContextType = {
  profile: ProfileType;
  loading: boolean;
  error: string;
  setProfile: React.Dispatch<React.SetStateAction<ProfileType>>;
};

const ProfileContext = createContext({} as ProfileContextType);
export default ProfileContext;

export const useProfileContext = () => useContext(ProfileContext);
