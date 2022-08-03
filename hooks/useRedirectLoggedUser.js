import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUserContext } from "../context/UserContext";

const useRedirectLoggedUser = (path = "/") => {
  const router = useRouter();
  const { loggedIn } = useUserContext();

  useEffect(() => {
    if (loggedIn) {
      router.push(path);
    }
  }, [path, loggedIn, router]);

  return loggedIn;
};

export default useRedirectLoggedUser;
