import React from 'react';
import { Message, Button, Input, Container, Header } from 'semantic-ui-react';
import Cookies from 'js-cookie';

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    usernameError: '',
    emailError: '',
  };

  onSubmit = () => {
    const { username, password, email } = this.state;
    this.setState({
      usernameError: '',
      emailError: '',
    });

    fetch(
      `${
        process.env.RAZZLE_API_ENDPOINT
      }wp-json/jwt/v1/auth/register?username=${username}&password=${password}&email=${email}`,
      {
        method: 'post',
      },
    )
      .then(response => response.json())
      .then(json => {
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
    if ('existing_user_login' === err.code) {
      this.setState({ usernameError: err.message });
    }

    if ('existing_user_email' === err.code) {
      this.setState({ emailError: err.message });
    }
  };

  onChange = e => {
    const { name, value } = e.target;
    // name = "email";
    this.setState({ [name]: value });
  };

  render() {
    const { username, email, password, usernameError, emailError } = this.state;

    const errorList = [];

    if (usernameError) {
      errorList.push(usernameError);
    }

    if (emailError) {
      errorList.push(emailError);
    }

    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Input
          name="username"
          error={!!usernameError}
          onChange={this.onChange}
          value={username}
          placeholder="Username"
          fluid
        />
        <Input
          name="email"
          error={!!emailError}
          onChange={this.onChange}
          value={email}
          placeholder="Email"
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
        {usernameError || emailError ? (
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

export default Register;
