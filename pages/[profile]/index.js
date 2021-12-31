import { useRouter } from "next/router";
import Profile from "../../components/profile";

export default function ProfilePage() {
  const router = useRouter();
  const { profile } = router.query;
  console.log(profile);
  return <Profile profile={profile} />;
}
