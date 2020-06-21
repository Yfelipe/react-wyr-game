import { RECEIVE_USERS, USER_ANSWERED, USER_CREATED } from "../actions/users";

export default function users (state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS :
            return {
                ...state,
                ...action.users
            }
        case USER_ANSWERED :
            const { authedUser, qid, answer } = action

            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answer
                    }
                }
            }
        case USER_CREATED :
            const { user, id } = action

            return {
                ...state,
                [user]: {
                    ...state[user],
                    questions: state[user].questions.concat(id)
                }
            }
        default:
            return state
    }

}