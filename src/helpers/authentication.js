import decode from 'jwt-decode';

export const isAuthenticated = token => {
  try {
    const tokenData = decode(token);
    const currentTime = Math.round(new Date().getTime() / 1000);
    if (tokenData.exp < currentTime) {
      throw new Error('expiredToken');
    }
  } catch (err) {
    return false;
  }
  return true;
};
