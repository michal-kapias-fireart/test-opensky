import { takeEvery, put, delay } from "redux-saga/effects";
import { LOGIN, loginSuccess, loginFailure } from "../modules/login";

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

export default function* loginSaga() {
  yield takeEvery(LOGIN, loginUserSaga);
}
