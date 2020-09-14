import { LOGIN } from "./types";

export const login = (token, user) => ({
  type: LOGIN,
  token,
  user,
});
