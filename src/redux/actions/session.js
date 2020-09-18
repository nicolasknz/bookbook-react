import { LOGIN, EDIT_USER } from "./types";

export const login = (token, user) => ({
  type: LOGIN,
  token,
  user,
});

export const editUser = (userEdited) => ({
  type: EDIT_USER,
  userEdited,
});