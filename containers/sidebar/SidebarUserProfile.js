import { useContext } from "react";
import Avatar from "../../components/avatar";
import { default as Container } from "../../components/sidebar/profile/SidebarUserProfileContainer";
import SidebarUserProfileData from "../../components/sidebar/profile/SidebarUserProfileData";
import SidebarButton from "../../components/sidebar/SidebarButton";
import SidebarText from "../../components/sidebar/SidebarText";
import UserContext from "../../context/UserContext";
import Link from "next/link";

const SidebarUserProfileContainer = () => {
  const {
    loggedIn,
    user: { username, fullName },
  } = useContext(UserContext);

  return (
    !!loggedIn && (
      <Container>
        <Link href={`/${username}`}>
          <a>
            <Avatar size={55} />
          </a>
        </Link>
        <SidebarUserProfileData>
          <Link href={`/${username}`}>
            <a>
              <SidebarText>{username}</SidebarText>
            </a>
          </Link>
          <SidebarText className="text-gray-300 font-normal">
            {fullName}
          </SidebarText>
        </SidebarUserProfileData>
        <SidebarButton className={"ml-auto text-blue"}>Switch</SidebarButton>
      </Container>
    )
  );
};

export default SidebarUserProfileContainer;
