export const GET_AIRPORTS = "GET_AIRPORTS";
export const GET_AIRPORTS_SUCCESS = "GET_AIRPORTS_SUCCESS";
export const GET_AIRPORTS_FAILURE = "GET_AIRPORTS_FAILURE";

export const SELECT_AIRPORT = "SELECT_AIRPORT";

export const GET_DEPARTURE = "GET_DEPARTURE";
export const GET_DEPARTURE_SUCCESS = "GET_DEPARTURE_SUCCESS";
export const GET_DEPARTURE_FAILURE = "GET_DEPARTURE_FAILURE";

export const GET_ARRIVAL = "GET_ARRIVAL";
export const GET_ARRIVAL_SUCCESS = "GET_ARRIVAL_SUCCESS";
export const GET_ARRIVAL_FAILURE = "GET_ARRIVAL_FAILURE";

export const initialState = {
  airports: null,
  loading: false,
  error: null,
  selectedAirport: {},
  departure: null,
  arrival: null
};

export default function airportsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AIRPORTS:
      return { ...state, loading: true, airports: null, error: null };
    case GET_AIRPORTS_SUCCESS:
      return { ...state, loading: false, airports: action.airports };
    case GET_AIRPORTS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case SELECT_AIRPORT:
      return { ...state, selectedAirport: action.selectedAirport };
    case GET_DEPARTURE:
      return { ...state, loading: true, departure: null, error: null };
    case GET_DEPARTURE_SUCCESS:
      return { ...state, loading: false, departure: action.departure };
    case GET_DEPARTURE_FAILURE:
      return { ...state, loading: false, error: action.error };
    case GET_ARRIVAL:
      return { ...state, loading: true, arrival: null, error: null };
    case GET_ARRIVAL_SUCCESS:
      return { ...state, loading: false, arrival: action.arrival };
    case GET_ARRIVAL_FAILURE:
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

export const selectAirport = airport => ({
  type: SELECT_AIRPORT,
  selectedAirport: airport
});

export const getDeparture = (interval) => ({
  type: GET_DEPARTURE,
  interval
});

export const getDepartureSuccess = departure => ({
  type: GET_DEPARTURE_SUCCESS,
  departure
});

export const getDepartureFailure = error => ({
  type: GET_DEPARTURE_FAILURE,
  error
});

export const getArrival = (interval) => ({
  type: GET_ARRIVAL,
  interval
});

export const getArrivalSuccess = arrival => ({
  type: GET_ARRIVAL_SUCCESS,
  arrival
});

export const getArrivalFailure = error => ({
  type: GET_ARRIVAL_FAILURE,
  error
});
