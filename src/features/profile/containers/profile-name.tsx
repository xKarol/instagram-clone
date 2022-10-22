import { useProfileContext } from "../context";

const ProfileNameContainer = () => {
  const {
    profile: {
      user: { username },
    },
  } = useProfileContext();

  return (
    <span className="text-[26px] font-light truncate mr-[10px]">
      {username}
    </span>
  );
};

export default ProfileNameContainer;
