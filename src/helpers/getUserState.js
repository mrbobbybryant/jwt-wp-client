import Request from 'request-promise';

export default (cookie, callback) => {
  if (!cookie) {
    return callback({
      user: {
        jwt: '',
      },
    });
  }

  return Request({
    uri: 'https://archsystems.dev/wp-json/wp/v2/users/me?xdebug=on',
    rejectUnauthorized: false,
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
    json: true,
  })
    .then(response => {
      return callback({ user: response });
    })
    .catch(e => console.log(e));
};
