// src/mocks/doctors.ts

import type { Doctor } from "../types/Doctor";

export const doctorsMock: Doctor[] = [
  {
    id: 1,
    name: "Dr. João Silva",
    crm: "123456",
    specialty: "Cardiologia",
    email: "joao.silva@hospital.com",
    phone: "(11) 99999-9999",
    isActive: true,
  },
  {
    id: 2,
    name: "Dra. Ana Paula",
    crm: "654321",
    specialty: "Dermatologia",
    email: "ana.paula@hospital.com",
    phone: "(11) 98888-8888",
    isActive: true,
  },
];
