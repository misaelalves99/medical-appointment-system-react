// src/types/Doctor.ts

export interface Doctor {
  id: number;
  name: string;
  fullName?: string;
  crm: string;
  specialty: string;
  email: string;
  phone: string;
  isActive: boolean;
}
