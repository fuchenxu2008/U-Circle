export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

export function getAuthToken() {
  const user = getCurrentUser();
  return user ? user.token : null;
}

export function getAuthHeader() {
  return { headers: { Authorization: `Bearer ${getAuthToken()}` } };
}
