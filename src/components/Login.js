import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Card } from "react-bootstrap";
import Logo from "../logo.svg"
import {setUser} from "../actions/setUser";
import {Redirect} from "react-router-dom";

class Login extends Component {
    state = {
        userId : "",
        redirectTo: false
    }

    handleLogin = () => {
        const { userId } = this.state
        const { dispatch } = this.props

        dispatch(setUser(userId))

        this.setState(() => ({
            redirectTo: true
        }))
    }

    handleChange = (e) => {
        let id = e.target.value;

        e.preventDefault();
        this.setState({
            userId: id,
        })

    }

    render() {
        const { users } =this.props;
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectTo } = this.state

        if (redirectTo) {
            return <Redirect to={from} />
        }

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
                                <Form.Control as="select" onChange={this.handleChange}>
                                    <option hidden />
                                    {users.length === 0 ? null : users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Button variant="dark" onClick={this.handleLogin}>Sign In</Button>
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