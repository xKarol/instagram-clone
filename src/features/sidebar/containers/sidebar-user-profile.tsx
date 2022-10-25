import Link from "next/link";
import React from "react";
import { Avatar } from "../../../components/avatar";
import { useUserContext } from "../../../context/user-context";
import {
  SidebarButton,
  SidebarText,
  SidebarProfileContainer as Container,
  SidebarProfileData,
} from "../components";

const SidebarUserProfileContainer = () => {
  const { loggedIn, user } = useUserContext() || {};
  const { username, fullName, avatar } = user || {};

  return loggedIn ? (
    <Container data-testid="sidebar-profile">
      <Link href={`/${username}`}>
        <a>
          <Avatar
            src={avatar.src}
            size={55}
            alt={`${username}'s avatar`}
            data-testid="sidebar-profile-avatar"
          />
        </a>
      </Link>
      <SidebarProfileData>
        <Link href={`/${username}`}>
          <a data-testid="sidebar-profile-username">
            <SidebarText>{username}</SidebarText>
          </a>
        </Link>
        <SidebarText
          className="text-gray-300 font-normal"
          data-testid="sidebar-profile-fullname"
        >
          {fullName}
        </SidebarText>
      </SidebarProfileData>
      <SidebarButton className="ml-auto text-blue">Switch</SidebarButton>
    </Container>
  ) : null;
};

export default SidebarUserProfileContainer;
