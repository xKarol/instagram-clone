import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { MdHomeFilled, MdOutlineAddBox } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { FaRegCompass } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import Logo from "../../components/logo";
import Avatar from "../../components/avatar";
import DropdownMenu from "../../components/dropdown";
import ProfileDropdown from "../../components/dropdown/ProfileDropdown";
import {
  HeaderContainer as Container,
  HeaderAuth,
  HeaderAuthButton,
  HeaderNavLink,
  HeaderNavList,
  HeaderSearchBar,
} from "../../components/header";
import { PostUploadContainer } from "../post-upload";

const HeaderContainer = ({ ...props }) => {
  const [show, setShow] = useState(false);
  const { loggedIn, user } = useContext(UserContext);

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
            <HeaderNavLink aria-label="notifications" data-id="dropdown">
              <IoMdHeartEmpty />
            </HeaderNavLink>
            <HeaderNavLink
              aria-label="user profile"
              className="w-[23px] h-[23px]"
              data-id="dropdown"
            >
              <DropdownMenu items={<ProfileDropdown />}>
                <Avatar
                  src={user.avatar}
                  className="pointer-events-none"
                  size={23}
                />
              </DropdownMenu>
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
      <PostUploadContainer show={show} setShow={setShow} />
    </>
  );
};

export default HeaderContainer;
