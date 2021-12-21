import { useContext } from "react";
import UserContext from "../context/UserContext";
import Header from "../components/Header";
export default function Home() {
  const user = useContext(UserContext);
  return (
    <>
      <Header user={user} />
    </>
  );
}
