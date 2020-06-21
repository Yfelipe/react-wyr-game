export const RECEIVE_USERS = "RECEIVE_USERS";
export const USER_ANSWERED = "USER_ANSWERED";
export const USER_CREATED = "USER_CREATED";

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export function userAnswered(authedUser, qid, answer) {
    return {
        type: USER_ANSWERED,
        authedUser,
        qid,
        answer
    }
}

export function userCreated(id, user) {
    return {
        type: USER_CREATED,
        id,
        user

    }

}