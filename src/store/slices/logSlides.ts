import { FarmingLog } from "@/src/types/log";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LogState {
  logs: FarmingLog[];
  loading: boolean;
}

const initialState: LogState = {
  logs: [],
  loading: false,
};

const logSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    // Thêm action này vào slice
    retrySyncPendingLogs: (state) => {
      // Action này chỉ dùng để trigger Saga, không thay đổi state ở đây
    },
    // Action when user press save
    addLogRequest: (state, action: PayloadAction<FarmingLog>) => {
      const index = state.logs.findIndex((l) => l.id === action.payload.id);
      if (index === -1) {
        state.logs.push(action.payload);
      } else {
        // Nếu đã tồn tại (trường hợp retry), chỉ cập nhật dữ liệu nếu cần
        state.logs[index] = action.payload;
      }
    },
    // Action update status after synced
    updateSyncStatus: (
      state,
      action: PayloadAction<{ id: string; status: "synced" | "failed" }>,
    ) => {
      const index = state.logs.findIndex((log) => log.id === action.payload.id);
      if (index !== -1) {
        state.logs[index].syncStatus = action.payload.status;
      }
    },
  },
});

export const { addLogRequest, updateSyncStatus } = logSlice.actions;
export default logSlice.reducer;
