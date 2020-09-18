import { combineReducers } from "redux";

import session from "./session";
import userBooks from "./user-books"

export default combineReducers({ session, userBooks });
