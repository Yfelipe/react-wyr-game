import React, { Component } from "react";
import { connect } from "react-redux";
import UnQuestions from "./UnQuestions";
import AnQuestions from "./AnQuestions";
import {Tabs, Tab, Card} from "react-bootstrap";


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.setQuestions = this.setQuestions.bind(this);
        this.state = {
            unansweredEmpty: true,
            answeredEmpty: true,
            unAnswered: [],
            answered: [],

        }
    }

    componentDidMount() {
        this.setQuestions();
    }

    setQuestions() {
        const {setUser} = this.props;

        this.props.questions.map((question) => {
            if (!question.optionOne.votes.includes(setUser.id) && !question.optionTwo.votes.includes(setUser.id)) {
                this.setState({unansweredEmpty: false});
                this.setState(prevState => ({
                    unAnswered: [...prevState.unAnswered, question]
                }));
            } else if (question.optionOne.votes.length > 0 || question.optionTwo.votes.length > 0) {
                        this.setState({answeredEmpty: false});
                        this.setState(prevState => ({
                            answered: [...prevState.answered, question]
                        }))
            }
            return null;
        })

    }


    render() {


        return (
            <div className='center' key="dashMainDiv">
                <Card className="main-card" key="dashMainCard">
                    <Tabs defaultActiveKey="Unanswered" id="noanim-tab-example" style={{padding: "10px", margin: "auto"}}>
                        <Tab eventKey="Unanswered" title="Unanswered Questions" style={{margin: "10px"}}>
                            {this.state.unAnswered.map((question) => {
                                return (
                                    <div key={question.id + " divO"} style={{paddingTop: "20px"}}>
                                        <UnQuestions key={question.id} question={question}/>
                                    </div>
                                )
                            })}
                            {this.state.unansweredEmpty && <UnQuestions empty={true} />}
                        </Tab>
                        <Tab eventKey="Answered" title="Answered Questions" style={{margin: "10px"}}>
                            {this.state.answered.map((question) => {
                                return (
                                    <div key={question.id + " divT"} style={{paddingTop: "20px"}}>
                                        <AnQuestions key={question.id} question={question} />
                                    </div>
                                )
                            })}
                            {this.state.answeredEmpty && <AnQuestions empty={true} />}
                        </Tab>
                    </Tabs>
                </Card>
            </div>
        )
    }
}

function mapStateToProps ({ questions, setUser }) {
    return {
        questions: Object.values(questions).sort((a, b) => (Object.keys(a.timestamp) < Object.keys(b.timestamp)) ? 0 : -1),
        setUser: setUser
    }
}

export default connect(mapStateToProps)(Dashboard)