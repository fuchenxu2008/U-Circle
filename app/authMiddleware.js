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
  return { headers: { Authorization: `Bearer ${getAuthToken('token')}` } };
}
