export function getCurrentUser(field = null) {
  try {
    const user = JSON.parse(localStorage.getItem('state')).global.currentUser;
    return user && field ? user[field] : user;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export function getAuthToken() {
  try {
    const token = JSON.parse(localStorage.getItem('state')).global.token;
    return token;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export function getAuthHeader() {
  return { headers: { Authorization: `Bearer ${getCurrentUser('token')}` } };
}
