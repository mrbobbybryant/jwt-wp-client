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
import { isAuthenticated } from './authentication';
import Cookies from 'js-cookie';

const PrivateRoute = ({ component: Component, token, ...rest }) => (
  <Route
    {...rest}
    render={(...props) => {
      let authorized = '';
      if (token) {
        authorized = isAuthenticated(token);
      } else {
        authorized = isAuthenticated(Cookies.get('token'));
      }

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

const App = ({ token }, ...props) => (
  <Switch>
    <Route exact={true} path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <PrivateRoute
      path="/create-team"
      exact
      component={Protected}
      token={token}
    />
    <Route component={NoMatch} />
  </Switch>
);

export default App;
