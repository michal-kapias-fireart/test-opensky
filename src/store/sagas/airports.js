import { takeEvery, put, delay } from "redux-saga/effects";
import {
  GET_AIRPORTS,
  getAirportsSuccess,
  getAirports
} from "../modules/airports";
import airports from "../../constants/airports";

function* getAirportsSaga() {
  try {
    yield delay(1000);
    yield put(getAirportsSuccess(airports.data));
  } catch (error) {
    console.error(error.message);
    yield put(getAirports(error.message));
  }
}

export default function* airportsSaga() {
  yield takeEvery(GET_AIRPORTS, getAirportsSaga);
}
