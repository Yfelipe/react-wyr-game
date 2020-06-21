import React, { Component } from "react";
import { connect } from "react-redux";
import {Button, Card, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {saveAnswer} from "../actions/questions";
import {userAnswered} from "../actions/users";

class FullQuestion extends Component {
    state = {
        selected: "",
    }

    handleCheck = (e) => {
        if (this.state.selected === e.target.value) {
            this.setState({selected: ""})
        } else {
            this.setState({selected: e.target.value})
        }
    }

    handleSubmit = (authedUser, qid, answer) => {
        const { dispatch } = this.props

        dispatch(saveAnswer(authedUser, qid, answer))
        dispatch(userAnswered(authedUser, qid, answer))

    }


    render() {
        const { id, questions, users, setUser } = this.props ;
        const question = questions[id] ;

        return (
            <div className="center">
                <Card className="main-card" key={question.id}>
                    <Card.Header style={{textAlign: "left"}}><b>{question.author}</b></Card.Header>
                    <Card.Body className="pad-card">
                        <div className="split left">
                            <img className="custom-image-question" alt="Avatar" src={users[question.author].avatarURL} />
                        </div>
                        <div className="split right">
                            <h4>Would you rather?</h4>
                            <Form.Check
                                style={{textAlign: "left"}}
                                value="optionOne"
                                label={question.optionOne.text}
                                onChange={this.handleCheck}
                                checked={this.state.selected === "optionOne"}
                            />
                            <Form.Check
                                style={{textAlign: "left"}}
                                value="optionTwo"
                                label={question.optionTwo.text}
                                onChange={this.handleCheck}
                                checked={this.state.selected === "optionTwo"}
                            />
                            <Link to={`/question/result/${question.id}`}>
                                <Button onClick={() => {this.handleSubmit(setUser.id, question.id, this.state.selected)}} variant="success" disabled={this.state.selected ? false : true}>Submit</Button>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }

}

function mapStatToProps ({questions, users, setUser}, props) {
    const { id } = props.match.params

    return {
        id,
        setUser: setUser ? setUser : null,
        users,
        questions
    }
}


export default connect(mapStatToProps)(FullQuestion)