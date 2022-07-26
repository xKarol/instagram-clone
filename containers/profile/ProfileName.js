import { useContext } from "react";
import ProfileContext from "../../context/ProfileContext";
import Skeleton from "../../components/skeleton";

const ProfileNameContainer = () => {
  const {
    user: { username: profileName },
    loading,
  } = useContext(ProfileContext);

  return (
    <span className="text-[26px] font-light truncate mr-[10px]">
      {!loading ? (
        profileName
      ) : (
        <Skeleton className={"w-[50px] h-[20px] rounded-md"} />
      )}
    </span>
  );
};

export default ProfileNameContainer;
