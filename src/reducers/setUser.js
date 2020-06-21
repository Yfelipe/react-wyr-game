import { SET_USER, LOGOUT_USER } from "../actions/setUser";

export default function setUser (state = "", action) {
    switch (action.type) {
        case SET_USER :
            return {
                id: action.id,
                name: action.name,
                avatar: action.avatar
            }
        case LOGOUT_USER :
            return null
        default :
            return state
    }
}