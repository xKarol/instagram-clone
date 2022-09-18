import { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import Logo from "../../components/logo";
import {
  HeaderContainer as Container,
  HeaderAuth,
  HeaderAuthButton,
  HeaderSearchBar,
} from "../../components/header";
import { PostUploadContainer } from "../post-upload";
import HeaderNavbarContainer from "./HeaderNavbar";

const HeaderContainer = ({ ...props }) => {
  const [show, setShow] = useState(false);
  const { loggedIn } = useUserContext();

  return (
    <>
      <Container {...props} data-testid="header">
        <Logo size={100} href="/" data-testid="logo" />
        <HeaderSearchBar data-testid="header-searchbar" />
        {loggedIn ? (
          <HeaderNavbarContainer setShow={setShow} />
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
