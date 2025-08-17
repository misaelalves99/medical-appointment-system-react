// src/types/PatientForm.ts

export interface PatientForm {
  id?: number; // opcional no Create
  name: string;
  cpf: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
}
