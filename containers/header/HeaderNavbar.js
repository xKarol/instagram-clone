import { FaRegCompass } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdHomeFilled, MdOutlineAddBox } from "react-icons/md";
import Avatar from "../../components/avatar";
import DropdownMenu from "../../components/dropdown";
import { HeaderNavLink, HeaderNavList } from "../../components/header";
import { ROUTE_HOME } from "../../constants/routes";
import { useUserContext } from "../../context/UserContext";
import HeaderProfileDropdownContainer from "./HeaderProfileDropdown";

const HeaderNavbarContainer = ({ setShow }) => {
  const {
    user: { username, avatar },
  } = useUserContext();

  return (
    <HeaderNavList>
      <HeaderNavLink href={ROUTE_HOME} aria-label="home">
        <MdHomeFilled />
      </HeaderNavLink>
      <HeaderNavLink aria-label="message">
        <FiSend />
      </HeaderNavLink>
      <HeaderNavLink
        aria-label="upload"
        onClick={() => setShow(true)}
        data-testid="add-post-btn"
      >
        <MdOutlineAddBox />
      </HeaderNavLink>
      <HeaderNavLink aria-label="explore">
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
        <DropdownMenu items={<HeaderProfileDropdownContainer />}>
          <Avatar
            src={avatar}
            className="pointer-events-none"
            size={23}
            alt={`${username}'s avatar`}
          />
        </DropdownMenu>
      </HeaderNavLink>
    </HeaderNavList>
  );
};

export default HeaderNavbarContainer;
