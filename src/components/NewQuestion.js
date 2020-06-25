import React, { Component } from "react";
import {Button, Card, Form} from "react-bootstrap";
import {connect} from "react-redux";
import {saveQuestion} from "../actions/questions";
import {userCreated} from "../actions/users";



class NewQuestion extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            optionOne: "",
            optionTwo: ""
        }
    }

    handleChange(e) {
        e.preventDefault();

        this.setState({[e.target.name]: e.target.value});
    }

    handleSave() {
        const { dispatch, setUser } = this.props;
        const { optionOne, optionTwo } = this.state;
        const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        if(!optionOne || !optionTwo || optionOne === optionTwo){
            return alert("Please make sure the options are set and not the same!")
        } else {
            dispatch(saveQuestion(optionOne, optionTwo, setUser.id, id));
            dispatch(userCreated(id, setUser.id));

            window.location = "/"
        }

    }


    render() {
        return (
            <div className="center">
                <Card className="main-card" >
                    <Card.Header style={{textAlign: "center"}}><h2><b>Create New Question</b></h2></Card.Header>
                    <Card.Body className="pad-card">
                        <span>
                            <p style={{textAlign: "left"}}>Complete the question:</p>
                        </span>
                        <span>
                            <h5 style={{textAlign: "left"}}>Would you rather...</h5>
                            <Form>
                                <Form.Group controlId="formNewQuestion1">
                                    <Form.Control type="text" name="optionOne" placeholder="Enter Option One Here." onChange={this.handleChange} />
                                </Form.Group>
                                <p><b>OR</b></p>
                                <Form.Group controlId="formNewQuestion2">
                                    <Form.Control type="text" name="optionTwo" placeholder="Enter Option Two Here." onChange={this.handleChange} />
                                </Form.Group>
                            </Form>
                            <Button variant="success" onClick={() => {this.handleSave()}} >Submit</Button>
                        </span>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

function mapStateToProps ({ setUser }) {
    return {
        setUser: setUser
    }
}

export default connect(mapStateToProps)(NewQuestion)