import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import {logoutUser} from "../actions/setUser";
import {Link} from "react-router-dom";

class NavMain extends Component {

    handleLogout = () => {
        const { dispatch } = this.props;

        dispatch(logoutUser());
    }

    render() {
         const { setUser } = this.props;

        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Would You Rather?</Navbar.Brand>
                {setUser
                    ? <Nav className="mr-auto">
                        <Nav.Link as="div">
                            <Link className="nav-link-custom" to="/">
                                Home
                            </Link>
                        </Nav.Link>
                        <Nav.Link as="div">
                            <Link className="nav-link-custom" to="/add">
                                New Question
                            </Link>
                        </Nav.Link>
                        <Nav.Link as="div">
                            <Link className="nav-link-custom" to="/leaderboard">
                                Leader Board
                            </Link>
                        </Nav.Link>
                    </Nav>
                    : null}
                <Nav>
                    {setUser
                        ? <Nav>
                            <Navbar.Text style={{paddingRight: "10px"}}>
                                <img
                                    className="avatar-image"
                                    src={setUser.avatar}
                                    alt="Avatar"
                                />
                                Hello, {setUser.name}
                            </Navbar.Text>
                            <Nav.Link as="div" onClick={this.handleLogout}>
                                <Link className="nav-link-custom" to="/login">
                                    Logout
                                </Link>
                            </Nav.Link>
                        </Nav>
                        : null}
                </Nav>
            </Navbar>
        )
    }
}

function mapStateToProps ({ setUser }) {
    return {
        setUser: setUser
    }
}

export default connect(mapStateToProps)(NavMain)