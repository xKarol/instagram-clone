import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import UserContext from "../context/UserContext";

export default function useRedirectLoggedUser(path = "/") {
  const router = useRouter();
  const user = useContext(UserContext);

  useEffect(() => {
    if (user?.loggedIn) {
      router.push(path);
    }
  }, [path]);

  return user?.loggedIn;
}
