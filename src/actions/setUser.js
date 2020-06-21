export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export function setUser(id, name, avatar) {
    return {
        type: SET_USER,
        id,
        name,
        avatar
    }
}

export function logoutUser() {
    return {
        type: LOGOUT_USER
    }
}