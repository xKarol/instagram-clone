import Statistics from "./Statistics";
import ProfileData from "./ProfileData";
import Nav from "./Nav";
import Photos from "./Photos";
import { useContext } from "react";
import ProfileContext from "../../context/ProfileContext";

export default function Profile() {
  const { user, photos } = useContext(ProfileContext);
  console.log(user, photos);
  return (
    <>
      <ProfileData user={user} photos={photos} />
      <Statistics className={"md:hidden"} />
      <Nav />
      <Photos />
    </>
  );
}
