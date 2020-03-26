export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const initialState = {
  user: null,
  loading: false,
  error: null
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, loading: true, user: null, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.user };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

export const login = user => ({
  type: LOGIN,
  user
});

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error
});
