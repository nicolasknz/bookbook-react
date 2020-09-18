import { LOGIN, EDIT_USER } from "../actions/types";

const defaultState = {
  token: localStorage.getItem('token') || '',
  user: JSON.parse(localStorage.getItem('currentUser')) || {},
};

const session = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, token: action.token, user: action.user };
    case EDIT_USER:
      return { ...state, user: action.userEdited };
    default:
      return state;
  }
};

export default session;
