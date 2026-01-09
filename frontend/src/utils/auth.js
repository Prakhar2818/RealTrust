export const getToken = () => localStorage.getItem('token');

export const getAdmin = () => {
  const admin = localStorage.getItem('admin');
  return admin ? JSON.parse(admin) : null;
};

export const setAuth = (token, admin) => {
  localStorage.setItem('token', token);
  localStorage.setItem('admin', JSON.stringify(admin));
};

export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('admin');
};

export const isAuthenticated = () => {
  return !!getToken();
};
