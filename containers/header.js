import { default as Container } from "../components/header/HeaderContainer";
import HeaderNavLink from "../components/header/HeaderNavLink";
import HeaderNavList from "../components/header/HeaderNavList";
import HeaderSearchBar from "../components/header/HeaderSearchBar";
import { MdHomeFilled, MdOutlineAddBox } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { FaRegCompass } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import Logo from "../components/Logo";
import Avatar from "../components/Avatar";
import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import {
  NOTIFICATIONS_DROPDOWN,
  PROFILE_DROPDOWN,
} from "../constants/dropdown";
import Upload from "../components/upload";
import DropdownMenu from "../components/dropdown";
import HeaderAuth from "../components/header/HeaderAuth";
import HeaderAuthButton from "../components/header/HeaderAuthButton";

const HeaderContainer = ({ ...props }) => {
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);
  const { loggedIn, user } = useContext(UserContext);

  const handleShowDropdown = (type) => {
    setShowDropdown(showDropdown === null ? type : null);
  };

  return (
    <>
      <Container {...props}>
        <Logo size={100} />
        <HeaderSearchBar />
        {loggedIn ? (
          <HeaderNavList>
            <HeaderNavLink href="/" aria-label="home">
              <MdHomeFilled />
            </HeaderNavLink>
            <HeaderNavLink href="/" aria-label="message">
              <FiSend />
            </HeaderNavLink>
            <HeaderNavLink
              aria-label="upload"
              onClick={() => setShow(true)}
              data-cy="add-post-btn"
            >
              <MdOutlineAddBox />
            </HeaderNavLink>
            <HeaderNavLink href="/" aria-label="explore">
              <FaRegCompass />
            </HeaderNavLink>
            <HeaderNavLink
              aria-label="notifications"
              data-id="dropdown"
              onClick={() => handleShowDropdown(NOTIFICATIONS_DROPDOWN)}
            >
              <IoMdHeartEmpty />
            </HeaderNavLink>
            <HeaderNavLink
              aria-label="user profile"
              className="w-[23px] h-[23px]"
              data-id="dropdown"
              onClick={() => handleShowDropdown(PROFILE_DROPDOWN)}
            >
              <Avatar
                src={user.avatar}
                className="pointer-events-none"
                size={23}
              />
            </HeaderNavLink>
          </HeaderNavList>
        ) : (
          <HeaderAuth>
            <HeaderAuthButton href="/sign-in">Log In</HeaderAuthButton>
            <HeaderAuthButton href="/sign-up" variant="text">
              Sign Up
            </HeaderAuthButton>
          </HeaderAuth>
        )}
      </Container>
      <Upload show={show} setShow={setShow} testid="add-post-modal" />
      <DropdownMenu setShow={setShowDropdown} show={showDropdown} />
    </>
  );
};

export default HeaderContainer;
