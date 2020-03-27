export const GET_AIRPORTS = "GET_AIRPORTS";
export const GET_AIRPORTS_SUCCESS = "GET_AIRPORTS_SUCCESS";
export const GET_AIRPORTS_FAILURE = "GET_AIRPORTS_FAILURE";

export const initialState = {
  airports: null,
  loading: false,
  error: null
};

export default function airportsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AIRPORTS:
      return { ...state, loading: true, airports: null, error: null };
    case GET_AIRPORTS_SUCCESS:
      return { ...state, loading: false, airports: action.airports };
    case GET_AIRPORTS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

export const getAirports = () => ({
  type: GET_AIRPORTS
});

export const getAirportsSuccess = airports => ({
  type: GET_AIRPORTS_SUCCESS,
  airports
});

export const getAirportsFailure = error => ({
  type: GET_AIRPORTS_FAILURE,
  error
});
