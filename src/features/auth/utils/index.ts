import { authErrors } from "../constants";

export const getAuthErrorMessage = (code: string): string => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return authErrors[code] ?? "A problem occured.";
};
