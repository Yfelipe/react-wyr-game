import React from "react";
import {connect} from "react-redux";
import Poll from "./Poll";
import FullQuestion from "./FullQuestion";
import NotFound from "./NotFound";

function QuestionControler(props) {
    const {questions, setUser, id} = props;
    let question = questions[id];

    if(question === undefined  ) {
        return <NotFound/>
    }else if (question.optionOne.votes.includes(setUser.id) || question.optionTwo.votes.includes(setUser.id)){
        return <Poll id={id} />
    } else {
        return <FullQuestion id={id} />
    }
}

function mapStatToProps ({questions, users, setUser}, props) {
    const {id} = props.match.params

    return {
        id,
        setUser: setUser ? setUser : null,
        users,
        questions
    }
}

export default connect(mapStatToProps)(QuestionControler)