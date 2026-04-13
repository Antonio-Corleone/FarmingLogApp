import { all } from "redux-saga/effects";
import { watchLogSaga, watchNetworkConnectivitySaga } from "./logSaga";

export default function* rootSaga() {
  yield all([watchLogSaga(), watchNetworkConnectivitySaga()]);
}
