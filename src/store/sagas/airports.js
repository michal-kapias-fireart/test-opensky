import { takeEvery, put, delay, select, call } from "redux-saga/effects";
import {
  GET_AIRPORTS,
  getAirportsSuccess,
  getAirports,
  GET_DEPARTURE,
  getDepartureSuccess,
  getDepartureFailure,
  GET_ARRIVAL,
  getArrivalSuccess,
  getArrivalFailure
} from "../modules/airports";
import airports from "../../constants/airports";
import { getDeparture, getArrival } from "../../api/airports";

function errorHandling(error) {
  return error.response && error.response.status === 404
    ? "Not found results"
    : "Something went wrong";
}

function* calculateParameters(interval) {
  const store = yield select();
  const {
    selectedAirport: { ICAO: airport }
  } = store.airports;

  // minus one day in connection with Limitiations for anonymous (unauthenticated) users
  const end = Math.round(new Date() / 1000) - oneDay;
  const begin = end - interval * 60;
  return {
    airport,
    begin,
    end
  };
}

function* getAirportsSaga() {
  try {
    yield delay(1000);
    yield put(getAirportsSuccess(airports.data));
  } catch (error) {
    console.error(error.message);
    yield put(getAirports(error.message));
  }
}

const oneDay = 86400;

function* getDepartureSaga(action) {
  const params = yield calculateParameters(action.interval);

  try {
    const { data } = yield call(getDeparture, params);
    yield put(getDepartureSuccess(data));
  } catch (error) {
    console.error(error);
    let errorMessage = errorHandling(error);
    yield put(getDepartureFailure(errorMessage));
  }
}

function* getArrivalSaga(action) {
  const params = yield calculateParameters(action.interval);

  try {
    const { data } = yield call(getArrival, params);
    yield put(getArrivalSuccess(data));
  } catch (error) {
    console.error(error);
    let errorMessage = errorHandling(error);
    yield put(getDepartureFailure(errorMessage));
  }
}

export default function* airportsSaga() {
  yield takeEvery(GET_AIRPORTS, getAirportsSaga);
  yield takeEvery(GET_DEPARTURE, getDepartureSaga);
  yield takeEvery(GET_ARRIVAL, getArrivalSaga);
}
