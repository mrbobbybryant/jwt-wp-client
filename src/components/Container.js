import React, { Component } from 'react';
import logo from '../react.svg';

class Container extends Component {
  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to Razzle</h2>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Container;
