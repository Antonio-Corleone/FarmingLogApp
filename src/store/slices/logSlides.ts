import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FarmingLog } from "../../types/log";

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
    // Action when user press save [cite: 13, 17]
    addLogRequest: (state, action: PayloadAction<FarmingLog>) => {
      state.logs.push(action.payload);
    },
    // Action update status after synced [cite: 18]
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
