// src/types/PatientHistory.ts

export interface PatientHistoryItem {
  recordDate: string; // ISO string
  description: string;
  notes?: string | null;
}
