import React, { Component } from "react";
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";


export default class UnQuestions extends Component {

    render() {
        const { question, empty } = this.props ;

        if (empty) {
            return (
                <Card key="emptyC1">
                    <Card.Header style={{textAlign: "left"}}></Card.Header>
                    <Card.Body className="question-card">
                        <b>No Unanswered questions!</b>
                        <br/>
                    </Card.Body>
                </Card>
            )
        }

        return (
            <Card key={question.id}>
                <Card.Header style={{textAlign: "left"}}><b>{question.author}</b></Card.Header>
                <Card.Body className="question-card">
                    <b>Would you rather?</b>
                    <br/>
                    {question.optionOne.text}
                    <Link to={`/questions/${question.id}`} >
                        <Button variant="outline-success">View Poll</Button>
                    </Link>
                </Card.Body>
            </Card>
        )
    }
}