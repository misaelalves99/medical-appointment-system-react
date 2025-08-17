// src/mocks/patients.ts

import type { Patient } from '../types/Patient';

export const patientsMock: Patient[] = [
  {
    id: 1,
    name: "Carlos Oliveira",
    cpf: "123.456.789-00",
    dateOfBirth: "1990-05-15",
    email: "carlos@email.com",
    phone: "3333-3333",
    address: "Rua A, 123",
    gender: "Masculino",
  },
  {
    id: 2,
    name: "Maria Lima",
    cpf: "987.654.321-00",
    dateOfBirth: "1985-10-20",
    email: "maria@email.com",
    phone: "4444-4444",
    address: "Rua B, 456",
    gender: "Feminino",
  },
];
