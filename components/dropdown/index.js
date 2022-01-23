import { useEffect, useLayoutEffect, useState, useRef } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import ProfileDropdown from "./ProfileDropdown";
import NotificationDropdown from "./NotificationDropdown";
import * as dropdown from "../../constants/dropdown";

export default function DropdownMenu({ setShow, show }) {
  const [selectTarget, setTarget] = useState(null);
  const DropdownRef = useRef(null);
  const { width } = useWindowDimensions();

  const handleResize = () => {
    if (!selectTarget) return;
    const rect = selectTarget.getBoundingClientRect();
    DropdownRef.current.style.left = `${rect.left - 170}px`;
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.dataset.id !== "dropdown") {
        if (show === null) return;
        setShow(null);
        return;
      }
      setTarget(e.target);
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [show]);

  useLayoutEffect(() => {
    handleResize();
  }, [selectTarget, width]);

  return (
    <>
      <div
        className={`fixed min-w-[220px] rounded-md top-[55px] z-50 shadow-[0_0_10px_2px_rgba(0,0,0,0.1)] ${
          show === null && "hidden"
        }`}
        ref={DropdownRef}
      >
        {show === dropdown.PROFILE_DROPDOWN && <ProfileDropdown />}
        {show === dropdown.NOTIFICATIONS_DROPDOWN && <NotificationDropdown />}
      </div>
    </>
  );
}
