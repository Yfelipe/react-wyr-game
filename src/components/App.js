import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import '../App.css';
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import Login from "./Login";
import NavMain from "./NavMain";
import FullQuestion from "./FullQuestion";
import Poll from "./Poll";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import history from "../history";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }


  render() {
      const { setUser } = this.props;

      if(!setUser) {
          history.push("/login")
      }

    return (
        <Router>
            <Fragment>
                <NavMain />
                <div className='main-div'>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/questions/:id' component={FullQuestion} />
                    <Route path='/login' component={Login} />
                    <Route path='/question/result/:id' component={Poll} />
                    <Route path='/add' component={NewQuestion} />
                    <Route path='/leaderboard' component={LeaderBoard} />
                </div>
            </Fragment>
        </Router>
    )
  }

}

function mapStateToProps ({ setUser }) {
    return {
        setUser: setUser ? setUser : null,
    }
}

export default connect(mapStateToProps)(App)