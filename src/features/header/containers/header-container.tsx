import { useState } from "react";
import HeaderNavbarContainer from "./header-navbar";
import {
  HeaderAuth,
  HeaderAuthButton,
  HeaderContainer as Container,
  HeaderSearchBar,
} from "../components";
import { Logo } from "../../../components/logo";
import {
  ROUTE_HOME,
  ROUTE_SIGN_IN,
  ROUTE_SIGN_UP,
} from "../../../constants/routes";
import { useUserContext } from "../../../context/user-context";
import { PostUploadContainer } from "../../post-upload/containers";

type Props = React.ComponentProps<typeof Container>;

const HeaderContainer = ({ ...props }: Props) => {
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
