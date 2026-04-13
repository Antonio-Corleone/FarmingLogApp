import logReducer, {
  addLogRequest,
  updateSyncStatus,
} from "@/src/store/slices/logSlides";

describe("logSlice reducers", () => {
  const initialState = { logs: [], loading: false };

  it("should handle addLogRequest", () => {
    const newLog = { id: "1", activityName: "Test" } as any;
    const state = logReducer(initialState, addLogRequest(newLog));
    expect(state.logs).toHaveLength(1);
    expect(state.logs[0].id).toBe("1");
  });

  it("should not add duplicate log", () => {
    const existingState = { logs: [{ id: "1" }] } as any;
    const state = logReducer(existingState, addLogRequest({ id: "1" } as any));
    expect(state.logs).toHaveLength(1);
  });

  it("should update sync status", () => {
    const stateWithLog = { logs: [{ id: "1", syncStatus: "pending" }] } as any;
    const state = logReducer(
      stateWithLog,
      updateSyncStatus({ id: "1", status: "synced" }),
    );
    expect(state.logs[0].syncStatus).toBe("synced");
  });
  it("should not update sync status if log ID is not found (Branch coverage)", () => {
    const stateWithLog = {
      logs: [{ id: "1", activityName: "Test", syncStatus: "pending" }],
      loading: false,
    } as any;

    const action = updateSyncStatus({ id: "999", status: "synced" });
    const newState = logReducer(stateWithLog, action);

    expect(newState.logs[0].syncStatus).toBe("pending");
  });
});
