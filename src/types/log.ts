export type ActivityStatus = "Completed" | "Pending";
export type SyncStatus = "synced" | "pending" | "failed";

export interface FarmingLog {
  id: string; // UUID
  activityName: string; // e.g., Seeding, Fertilizing
  date: string;
  notes: string;
  status: ActivityStatus;
  syncStatus: SyncStatus; // Managing offline state
  createdAt: number;
}
