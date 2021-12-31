import { useContext } from "react";
import ProfileContext from "../../context/ProfileContext";

export default function Biography({ className }) {
  const { user } = useContext(ProfileContext);

  return <div className={`font-medium ${className}`}>{user?.fullName}</div>;
}
