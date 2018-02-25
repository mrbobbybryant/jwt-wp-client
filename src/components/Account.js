import React from 'react';

class Account extends React.Component {
  state = {};

  componentDidMount() {
    // fetch( `${
    //   process.env.RAZZLE_API_ENDPOINT
    // }wp-json/wp/v2/users/me`, {
    //     headers: {
    //         'Authorization': `Bearer '${}`)
    //     }
    // } )
  }

  render() {
    return <div className="user-account" />;
  }
}
