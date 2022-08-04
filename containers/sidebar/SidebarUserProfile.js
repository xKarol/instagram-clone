import Link from "next/link";
import Avatar from "../../components/avatar";
import {
  SidebarButton,
  SidebarText,
  SidebarUserProfileContainer as Container,
  SidebarUserProfileData,
} from "../../components/sidebar";
import { useUserContext } from "../../context/UserContext";

const SidebarUserProfileContainer = () => {
  const {
    loggedIn,
    user: { username, fullName, avatar },
  } = useUserContext();

  return (
    !!loggedIn && (
      <Container>
        <Link href={`/${username}`}>
          <a>
            <Avatar src={avatar} size={55} alt={`${username}'s avatar`} />
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
