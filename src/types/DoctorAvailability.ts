// src/types/DoctorAvailability.ts

export interface DoctorAvailability {
  doctorId: number;
  date: string;       // formato ISO (ex: "2025-08-08")
  startTime: string;  // ex: "08:00"
  endTime: string;    // ex: "12:00"
  isAvailable: boolean;
}
