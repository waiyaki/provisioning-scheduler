export function setAuthToken(token) {
  try {
    if (!!token) {
      window.localStorage.setItem('token', token);
    }
  } catch (error) {
    // Noop
  }
}

export function getAuthToken() {
  try {
    return window.localStorage.getItem('token');
  } catch (error) {
    return null;
  }
}

export function removeAuthToken() {
  window.localStorage.removeItem('token');
}

export function parseUserFromToken() {
  const token = getAuthToken();
  return token ? JSON.parse(window.atob(token.split('.')[1])) : null;
}
