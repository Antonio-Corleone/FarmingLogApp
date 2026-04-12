import NetInfo from "@react-native-community/netinfo";
import { call, delay, put, takeEvery } from "redux-saga/effects";
import { FarmingLog } from "../../types/log";
import { addLogRequest, updateSyncStatus } from "../slices/logSlides";

// Hàm giả lập gọi API
function* handleSyncLog(
  action: ReturnType<typeof addLogRequest>,
): Generator<any, void, any> {
  const log: FarmingLog = action.payload;

  try {
    const state = yield call(NetInfo.fetch);

    if (state.isConnected) {
      console.log(`[Syncing] Uploading log: ${log.activityName}...`);

      // Giả lập thời gian chờ API (setTimeout)
      yield delay(2000);

      console.log(`[Success] Log ${log.id} synced to server.`);
      yield put(updateSyncStatus({ id: log.id, status: "synced" }));
    } else {
      console.log(`[Offline] No network. Log ${log.id} saved locally.`);
      // Trạng thái mặc định đã là 'pending', không cần làm gì thêm
    }
  } catch (error) {
    console.error("[Error] Sync failed:", error);
    yield put(updateSyncStatus({ id: log.id, status: "failed" }));
  }
}

export function* watchLogSaga() {
  yield takeEvery(addLogRequest.type, handleSyncLog);
}
