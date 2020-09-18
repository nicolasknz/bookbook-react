import { LOGIN, UPDATE_INFO } from '../actions/types';

const defaultState = {
  token: localStorage.getItem('token') || '',
  user: JSON.parse(localStorage.getItem('currentUser')) || {},
};

const session = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, token: action.token, user: action.user };
    case UPDATE_INFO:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default session;
