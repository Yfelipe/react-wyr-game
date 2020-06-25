import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import '../App.css';
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import Login from "./Login";
import NavMain from "./NavMain";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import NotFound from "./NotFound";
import QuestionControler from "./QuestionControler";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }


  render() {
      const { setUser } = this.props;

      const PrivateRoute = ({ component: Component, ...rest }) => (
          <Route {...rest} render={(props) => (
              setUser
                  ? <Component {...props} />
                  : <Redirect to={{
                      pathname: '/login',
                      state: { from: props.location }
                  }} />
          )} />
      )

    return (
        <Router>
            <Fragment>
                <NavMain />
                <div className='main-div'>
                    <PrivateRoute path='/' exact component={Dashboard} />
                    <PrivateRoute path='/questions/:id' component={QuestionControler} />
                    <PrivateRoute path='/add' component={NewQuestion} />
                    <PrivateRoute path='/leaderboard' component={LeaderBoard} />
                    <PrivateRoute path="/404" component={NotFound} />
                    <Route path='/login' component={Login} />
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