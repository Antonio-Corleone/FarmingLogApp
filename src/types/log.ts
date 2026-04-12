export type ActivityStatus = "Completed" | "Pending"; // [cite: 14]
export type SyncStatus = "synced" | "pending" | "failed"; // [cite: 17, 18]

export interface FarmingLog {
  id: string; // UUID
  activityName: string; // e.g., Seeding, Fertilizing [cite: 9, 14]
  date: string; // [cite: 14]
  notes: string; // [cite: 14]
  status: ActivityStatus; // [cite: 14]
  syncStatus: SyncStatus; // Managing offline state [cite: 17, 18]
  createdAt: number;
}
