export function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

export function getCurrentUser(wanted = 'full') {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return (user && wanted === 'id') ? user._id : user;
}

export function clearCurrentUser() {
  localStorage.clear();
}

export function getAuthToken() {
  const user = getCurrentUser();
  return user ? user.token : null;
}

export function getAuthHeader() {
  return { headers: { Authorization: `Bearer ${getAuthToken()}` } };
}
