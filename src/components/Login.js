import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Card } from "react-bootstrap";
import Logo from "../logo.svg"
import {setUser} from "../actions/setUser";

class Login extends Component {
    state = {
        userId : "",
        userName: "",
        userAvatar: ""
    }

    handleLogin = () => {
        const { userId, userName, userAvatar } = this.state
        const { dispatch } = this.props

        dispatch(setUser(userId, userName, userAvatar))
    }

    handleChange = (e) => {
        const {users} = this.props;

        e.preventDefault();

        let id = e.target.value;

        users.map((user) => {
            if (user.id === id) {
               this.setState({
                   userId: id,
                   userName: user.name,
                   userAvatar: user.avatarURL
               })
            }
            return null;
        })
    }

    render() {
        const { users } =this.props;

        return (
            <div className='center'>
                <Card className="main-card">
                    <Card.Header>
                        <b>Welcome to the Would You Rather App!</b>
                        <Card.Text>Please sign in to continue</Card.Text>
                    </Card.Header>
                    <Card.Body className="login-style">
                        <img className="custom-image" alt="appLogo" src={Logo}/>
                        <Form>
                            <Form.Group controlId="userSelectForm">
                                <Form.Label><b>Sign in</b></Form.Label>
                                <Form.Control as="select" value={this.state.userLogin} onChange={this.handleChange}>
                                    <option hidden />
                                    {users.length === 0 ? null : users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Button variant="dark" href="/" onClick={this.handleLogin}>Sign In</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

function mapStateToProps ({ users }) {
    return {
        users: users ? Object.values(users) : null
    }
}

export default connect(mapStateToProps)(Login)