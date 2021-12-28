import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import UserContext from "../context/UserContext";

export default function useRedirectLoggedUser(path = "/") {
  const router = useRouter();
  const { loggedIn } = useContext(UserContext);

  useEffect(() => {
    if (loggedIn) {
      router.push(path);
    }
  }, [path, loggedIn]);

  return loggedIn;
}
