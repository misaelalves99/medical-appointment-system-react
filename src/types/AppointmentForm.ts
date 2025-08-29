// src/types/AppointmentForm.ts

export interface Option {
  value: string;
  label: string;
}

export interface AppointmentForm {
  patientId: string;
  doctorId: string;
  appointmentDate: string;
  status: string;
  notes: string;
}
