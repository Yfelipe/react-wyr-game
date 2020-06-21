import { combineReducers } from "redux";
import users from "./user";
import setUser from "./setUser";
import questions from "./questions";

export default combineReducers({
    users,
    setUser,
    questions,
})