import React, { Component } from "react";
import {Badge, Card, ProgressBar} from "react-bootstrap";
import {connect} from "react-redux";

class Poll extends Component {
    render() {

        const { id, questions, users, setUser } = this.props ;
        const question = questions[id] ;

        const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
        const optionOneCount = question.optionOne.votes.length ;
        const optionTwoCount = question.optionTwo.votes.length ;

        return (
            <div className="center">
                <Card className="main-card" key={question.id}>
                    <Card.Header style={{textAlign: "left"}}><b>{question.author}</b></Card.Header>
                    <Card.Body className="pad-card">
                        <div className="split left">
                            <img className="custom-image-poll" alt="Avatar" src={users[question.author].avatarURL} />
                        </div>
                        <div className="split right">
                            <h4 style={{textAlign: "left", paddingBottom: "10px"}}>Results:</h4>
                            <Card className="poll-card" style={question.optionOne.votes.includes(setUser.id) ? {backgroundColor: "lightyellow"} : null}>
                                <p className="poll-card-text"><b>Would you rather {question.optionOne.text}</b></p>
                                <ProgressBar animated variant="success" now={optionOneCount} max={totalVotes} label={`${optionOneCount/totalVotes * 100}%`}/>
                                <p><b>{`${optionOneCount} out of ${totalVotes}`}</b></p>
                                {question.optionOne.votes.includes(setUser.id) && <Badge style={{margin: "auto"}} pill variant="success">Your Vote!</Badge>}
                            </Card>
                            <Card className="poll-card" style={question.optionTwo.votes.includes(setUser.id) ? {backgroundColor: "lightyellow"} : null}>
                                <p className="poll-card-text"><b>Would you rather {question.optionTwo.text}</b></p>
                                <ProgressBar animated variant="success" now={optionTwoCount} max={totalVotes} label={`${optionTwoCount/totalVotes * 100}%`}/>
                                <p style={{marginBottom: "0"}}><b>{`${optionTwoCount} out of ${totalVotes}`}</b></p>
                                {question.optionTwo.votes.includes(setUser.id) && <Badge style={{margin: "auto"}} pill variant="success">Your Vote!</Badge>}
                            </Card>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
    }

}

function mapStatToProps ({questions, users, setUser}, props) {
   // const { id } = props.match.params

    return {
        questions,
        users,
        setUser: setUser
    }
}


export default connect(mapStatToProps)(Poll)