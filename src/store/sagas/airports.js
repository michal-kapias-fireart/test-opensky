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

function* getAirportsSaga() {
  try {
    yield delay(1000);
    yield put(getAirportsSuccess(airports.data));
  } catch (error) {
    console.error(error.message);
    yield put(getAirports(error.message));
  }
}

function* getDepartureSaga(action) {
  const store = yield select();
  const {
    selectedAirport: { ICAO }
  } = store.airports;
  try {
    const { data } = yield call(getDeparture, { ICAO });
    yield put(getDepartureSuccess(data));
  } catch (error) {
    let errorMessage = error.response.statusText || "Not found results";
    yield put(getDepartureFailure(errorMessage));
  }
}

function* getArrivalSaga(action) {
  const store = yield select();
  const {
    selectedAirport: { ICAO }
  } = store.airports;
  try {
    const { data } = yield call(getArrival, { ICAO });
    yield put(getArrivalSuccess(data));
  } catch (error) {
    let errorMessage = error.response.statusText || "Not found results";
    yield put(getArrivalFailure(errorMessage));
  }
}

export default function* airportsSaga() {
  yield takeEvery(GET_AIRPORTS, getAirportsSaga);
  yield takeEvery(GET_DEPARTURE, getDepartureSaga);
  yield takeEvery(GET_ARRIVAL, getArrivalSaga);
}
