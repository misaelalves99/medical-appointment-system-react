// src/domain/DoctorAvailability.ts

import type { Weekday } from './common';

export interface DoctorAvailability {
  id: string;
  doctorId: string;
  dayOfWeek: Weekday;
  startTime: string; // "08:00"
  endTime: string;   // "12:00"
  isAvailable: boolean;
}
