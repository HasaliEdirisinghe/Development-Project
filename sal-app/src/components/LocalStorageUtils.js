export const setUsername = (username) => {
  localStorage.setItem('username', username);
};

export const getUsername = () => {
  return localStorage.getItem('username');
};
