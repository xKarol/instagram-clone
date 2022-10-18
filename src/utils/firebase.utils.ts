import { authErrors } from "../constants/auth-errors";

export const getAuthErrorMessage = (code: string): string => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return authErrors[code] ?? "A problem occured.";
};
