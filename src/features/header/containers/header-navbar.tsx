import { FaRegCompass } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdHomeFilled, MdOutlineAddBox } from "react-icons/md";
import HeaderProfileDropdownContainer from "./header-profile-dropdown";
import { Avatar } from "../../../components/avatar";
import { Dropdown } from "../../../components/dropdown";
import { HeaderNavLink, HeaderNavList } from "../components";
import { ROUTE_HOME } from "../../../constants/routes";
import { useUserContext } from "../../../context/user-context";

type Props = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderNavbarContainer = ({ setShow }: Props) => {
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
        <Dropdown items={<HeaderProfileDropdownContainer />}>
          <Avatar
            src={avatar.src}
            className="pointer-events-none"
            size={23}
            alt={`${username}'s avatar`}
          />
        </Dropdown>
      </HeaderNavLink>
    </HeaderNavList>
  );
};

export default HeaderNavbarContainer;
