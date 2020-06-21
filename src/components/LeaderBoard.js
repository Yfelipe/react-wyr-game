import React, { Component } from "react";
import {Card} from "react-bootstrap";
import { connect } from "react-redux";

class LeaderBoard extends Component {
    state = {
        userCount:[],
    }

    componentDidMount() {
        this.countHighScore();
    }


    countHighScore(){
        const { users } = this.props;

        users.map((user) => {
            let scores = {
                name: user.name,
                aQuestions: Object.keys(user.answers).length,
                cQuestions: Object.keys(user.questions).length,
                total: Object.keys(user.answers).length + Object.keys(user.questions).length,
                avatarUrl: user.avatarURL
            }

            this.setState(prevState => ({
                userCount: [...prevState.userCount, scores]
            }))
            return null;
        })
    }

    render() {
        const { userCount } = this.state;
        const sortedCount = userCount.sort((a, b) => (a.total < b.total) ? 0 : -1);

        return (
            <div>
                {sortedCount.map((user, key) => {
                    return(
                        <Card className="main-card" key={user.name + "card"}>
                            <Card.Header>{key + 1} Place</Card.Header>
                            <Card.Body className="question-card" key={user.name + "cardBody"}>
                                <div className="split left">
                                    <img className="custom-image-question" alt="Avatar" src={user.avatarUrl} />
                                </div>
                                <div className="split right">
                                    <div style={{float: "left"}}>
                                        <h4>{user.name}</h4>
                                    </div>
                                    <br/>
                                    <div>
                                        <div style={{clear: "both"}}>
                                            <p style={{float: "left"}}>Answered Questions</p> <p style={{float: "right"}}>{user.aQuestions}</p>
                                        </div>
                                        <div style={{clear: "both"}}>
                                            <p style={{float: "left"}}>Created Questions</p><p style={{float: "right"}}>{user.cQuestions}</p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Footer>
                                <div style={{clear: "both"}}>
                                    <p style={{float: "left"}}>Score: </p><p style={{float: "right"}}>{user.total}</p>
                                </div>
                            </Card.Footer>
                        </Card>
                    )
                })}
            </div>
        )
    }
}

function mapStateToProps ({ users }) {
    return {
        users: users ? Object.values(users) : null
    }
}

export default connect(mapStateToProps)(LeaderBoard)

