export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const GET_USER = "GET_USER";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const initialState = {
  user: null,
  loading: false,
  error: null
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
    case GET_USER:
      return { ...state, loading: true, user: null, error: null };
    case LOGIN_SUCCESS:
    case GET_USER_SUCCESS:
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

export const getUser = () => ({
  type: GET_USER
});

export const getUserSuccess = user => ({
  type: GET_USER_SUCCESS,
  user
});

export const getUserFailure = error => ({
  type: GET_USER_FAILURE,
  error
});
