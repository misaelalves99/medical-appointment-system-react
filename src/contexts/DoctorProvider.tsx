// src/contexts/DoctorProvider.tsx

import React, { useState } from "react";
import { DoctorContext } from "./DoctorContext";
import type { Doctor } from "../types/Doctor";
import { doctorsMock } from "../mocks/doctors";

interface DoctorProviderProps {
  children: React.ReactNode;
}

export const DoctorsProvider: React.FC<DoctorProviderProps> = ({ children }) => {
  const [doctors, setDoctors] = useState<Doctor[]>(doctorsMock);

  const addDoctor = (doctor: Doctor) => {
    const newId = doctors.length > 0 ? Math.max(...doctors.map(d => d.id)) + 1 : 1;
    const newDoctor = { ...doctor, id: newId };
    setDoctors(prev => [...prev, newDoctor]);
    console.log("Novo médico adicionado:", newDoctor);
  };

  const updateDoctor = (updatedDoctor: Doctor) => {
    setDoctors(prev => prev.map(d => (d.id === updatedDoctor.id ? updatedDoctor : d)));
    console.log("Médico atualizado:", updatedDoctor);
  };

  const removeDoctor = (id: number) => {
    setDoctors(prev => prev.filter(d => d.id !== id));
    console.log("Médico excluído com id:", id);
  };

  return (
    <DoctorContext.Provider value={{ doctors, addDoctor, updateDoctor, removeDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
};
