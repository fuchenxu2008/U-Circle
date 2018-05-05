export function getAuthToken() {
  try {
    const token = JSON.parse(localStorage.getItem('globalState')).token;
    return token;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

export function getAuthHeader() {
  return { headers: { Authorization: `Bearer ${getAuthToken('token')}` } };
}
