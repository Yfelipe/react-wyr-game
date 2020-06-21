import { RECEIVE_QUESTIONS, SAVE_ANSWER, SAVE_QUESTION } from "../actions/questions";

export default function questions (state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS :
            return {
                ...state,
                ...action.questions
            }
        case SAVE_ANSWER :
            const {authedUser, qid, answer} = action
            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes:  state[qid][answer].votes.concat([authedUser])
                    }
                }
            }
        case SAVE_QUESTION :
            const  {optionOneText, optionTwoText, author, id} = action
            return {
                ...state,
                [id]: {
                    id:id,
                    timestamp: Date.now(),
                        author,
                        optionOne: {
                        votes: [],
                            text: optionOneText,
                    },
                    optionTwo: {
                        votes: [],
                            text: optionTwoText,
                    }
        }
            }
        default :
            return state
    }
}