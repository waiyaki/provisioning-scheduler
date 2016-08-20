const INITIAL_AUTH_STATE = {
  isAuthenticated: false
};

export default function authReducer(state = INITIAL_AUTH_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
