import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUserContext } from "../context/user-context";

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
