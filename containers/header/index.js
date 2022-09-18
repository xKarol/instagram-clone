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
import {
  ROUTE_HOME,
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP,
} from "../../constants/routes";

const HeaderContainer = ({ ...props }) => {
  const [show, setShow] = useState(false);
  const { loggedIn } = useUserContext();

  return (
    <>
      <Container {...props} data-testid="header">
        <Logo size={100} href={ROUTE_HOME} data-testid="logo" />
        <HeaderSearchBar data-testid="header-searchbar" />
        {loggedIn ? (
          <HeaderNavbarContainer setShow={setShow} />
        ) : (
          <HeaderAuth>
            <HeaderAuthButton href={ROUTE_SIGN_IN}>Log In</HeaderAuthButton>
            <HeaderAuthButton href={ROUTE_SIGN_UP} variant="text">
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
