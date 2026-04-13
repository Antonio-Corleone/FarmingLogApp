import { addLogRequest, updateSyncStatus } from "@/src/store/slices/logSlides";
import { FarmingLog } from "@/src/types/log";
import NetInfo from "@react-native-community/netinfo";
import { eventChannel } from "redux-saga";
import {
  call,
  delay,
  fork,
  put,
  select,
  take,
  takeEvery,
} from "redux-saga/effects";
import { RootState } from "../index";

export function* syncWorker(log: FarmingLog): Generator<any, void, any> {
  try {
    const state = yield call(NetInfo.fetch);

    if (state.isConnected) {
      console.log(`[Syncing] ID: ${log.id} - Activity: ${log.activityName}`);

      // Simulator call API
      yield delay(2000);

      yield put(updateSyncStatus({ id: log.id, status: "synced" }));
      console.log(`[Success] ID: ${log.id} synced.`);
    } else {
      console.log(`[Offline] ID: ${log.id} kept in local.`);
    }
  } catch (error) {
    if (log && log.id) {
      console.error(`[Error] Sync failed for ${log.id}:`, error);
      yield put(updateSyncStatus({ id: log.id, status: "failed" }));
    }
  }
}

export function* watchAddLogSaga(action: ReturnType<typeof addLogRequest>) {
  yield call(syncWorker, action.payload);
}

export function createNetworkChannel() {
  return eventChannel((emitter) => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      emitter(state.isConnected);
    });

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  });
}

export function* watchNetworkConnectivitySaga(): Generator<any, void, any> {
  const chan = yield call(createNetworkChannel);
  try {
    while (true) {
      const isConnected: boolean = yield take(chan);

      if (isConnected) {
        console.log("[Network] Online - Scanning for pending logs...");

        const allLogs: FarmingLog[] = yield select(
          (state: RootState) => state.logs.logs,
        );
        const pendingLogs = Array.isArray(allLogs)
          ? allLogs.filter(
              (log) =>
                log.syncStatus === "pending" || log.syncStatus === "failed",
            )
          : [];

        for (const log of pendingLogs) {
          yield fork(syncWorker, log);
        }
      }
    }
  } finally {
    chan.close();
  }
}

/**
 * Root Log Saga
 */
export function* watchLogSaga() {
  yield takeEvery(addLogRequest.type, watchAddLogSaga);
}
