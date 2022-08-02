import { authErrors } from "../constants/auth-errors";

export const getAuthErrorMessage = (code) => {
  return authErrors[code] ?? "A problem occured.";
};
