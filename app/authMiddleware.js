export function setCurrentUser(user) {
  try {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } catch (err) {
    console.log('Set user to localStorage failed');
  }
}

export function getCurrentUser(field = null) {
  try {
    const user = JSON.parse(localStorage.getItem('currentUser')) || undefined;
    return user && field ? user[field] : user;
  } catch (err) {
    return undefined;
  }
}

export function clearCurrentUser() {
  localStorage.clear();
}

export function getAuthHeader() {
  return { headers: { Authorization: `Bearer ${getCurrentUser('token')}` } };
}
