import { all } from "redux-saga/effects";
import { watchLogSaga } from "./logSaga";

export default function* rootSaga() {
  yield all([watchLogSaga()]);
}
