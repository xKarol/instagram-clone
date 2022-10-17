import { useRouter } from "next/router";

const ProfileNameContainer = () => {
  const router = useRouter();
  const { profile } = router.query;

  return (
    <span className="text-[26px] font-light truncate mr-[10px]">{profile}</span>
  );
};

export default ProfileNameContainer;
