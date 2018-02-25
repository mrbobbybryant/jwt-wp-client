import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Redirect from 'react-router-dom/Redirect';

import Home from './Home';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import Login from './Login';
import Register from './Register';
import NoMatch from './NoMatch';
import Protected from './Protected';
import { isAuthenticated } from '../helpers/authentication';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={(...props) => {
      const authorized = isAuthenticated(user.jwt);
      if (authorized) {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        );
      }
    }}
  />
);

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const UserRoute = connect(mapStateToProps)(PrivateRoute);

const App = (...props) => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <UserRoute path="/create-team" exact component={Protected} />
    <Route component={NoMatch} />
  </Switch>
);

export default App;
