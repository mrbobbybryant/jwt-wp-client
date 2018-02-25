import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <p className="Home-intro">
          To get started, edit <code>src/App.js</code> or{' '}
          <code>src/Home.js</code> and save to reload.
        </p>
        <ul className="Home-resources">
          <li>
            <a href="https://github.com/jaredpalmer/razzle">Docs</a>
          </li>
          <li>
            <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
          </li>
          <li>
            <Link to="/create-team">Protected Route</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Home;
