import { takeEvery, put, delay } from "redux-saga/effects";
import {
  LOGIN,
  loginSuccess,
  loginFailure,
  GET_USER,
  getUserSuccess,
  getUserFailure
} from "../modules/login";

function* loginUserSaga(action) {
  const { name, password } = action.user;
  try {
    yield delay(1000);
    if (name === "demo" && password === "demo") {
      localStorage.setItem("accessToken", name);
      yield put(loginSuccess(name));
    } else {
      throw new Error("User can't be authorized");
    }
  } catch (error) {
    console.error(error.message);
    yield put(loginFailure(error.message));
  }
}

function* getUserSaga() {
  try {
    const user = localStorage.getItem("accessToken");
    yield delay(1000);
    if (user) {
      yield put(getUserSuccess(user));
    } else {
      throw new Error("User not authorized");
    }
  } catch (error) {
    console.error(error.message);
    yield put(getUserFailure(error.message));
  }
}

export default function* loginSaga() {
  yield takeEvery(LOGIN, loginUserSaga);
  yield takeEvery(GET_USER, getUserSaga);
}
