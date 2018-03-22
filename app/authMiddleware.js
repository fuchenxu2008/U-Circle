const currentUser = localStorage.getItem('currentUser') || null;
const token = currentUser ? JSON.parse(currentUser).token : null;
export default {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
