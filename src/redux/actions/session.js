import { LOGIN, UPDATE_INFO } from './types';

export const login = (token, user) => ({
  type: LOGIN,
  token,
  user,
});

export const updateInfo = (user) => ({
  type: UPDATE_INFO,
  user,
});
