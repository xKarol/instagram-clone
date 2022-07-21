import { useContext } from "react";
import Link from "next/link";
import Avatar from "../../components/avatar";
import {
  SidebarButton,
  SidebarText,
  SidebarUserProfileContainer as Container,
  SidebarUserProfileData,
} from "../../components/sidebar";
import UserContext from "../../context/UserContext";

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
