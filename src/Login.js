import React from 'react';
import { Message, Button, Input, Container, Header } from 'semantic-ui-react';
import Cookies from 'js-cookie';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
  };

  onSubmit = () => {
    const { username, password } = this.state;
    this.setState({
      usernameError: '',
      passwordError: '',
    });

    fetch(
      `https://archsystems.dev/wp-json/jwt/v1/auth/login?username=${username}&password=${password}`,
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.code) {
          this.onError(json);
        }

        if (json.jwt) {
          Cookies.set('token', json.jwt);
          this.props.history.push('/');
        }
      })
      .catch(err => {
        console.warn(err);
      });
  };

  onError = err => {
    if ('invalid_username' === err.code) {
      this.setState({ usernameError: 'Invalid Username or password.' });
    }

    if ('incorrect_password' === err.code) {
      this.setState({ passwordError: 'Invalid Username or password.' });
    }
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password, usernameError, passwordError } = this.state;

    const errorList = [];

    if (usernameError) {
      errorList.push(usernameError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
      <Container text>
        <Header as="h2">Login</Header>
        <Input
          name="username"
          error={!!usernameError}
          onChange={this.onChange}
          value={username}
          placeholder="Username"
          fluid
        />
        <Input
          name="password"
          onChange={this.onChange}
          value={password}
          type="password"
          placeholder="Password"
          fluid
        />
        <Button onClick={this.onSubmit}>Submit</Button>
        {usernameError || passwordError ? (
          <Message
            error
            header="There was some errors with your submission"
            list={errorList}
          />
        ) : null}
      </Container>
    );
  }
}

export default Login;
