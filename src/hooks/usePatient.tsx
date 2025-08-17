// src/hooks/usePatient.tsx

import { useContext } from "react";
import { PatientContext } from "../contexts/PatientContext";

// Hook para acessar contexto de pacientes
export const usePatient = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error("usePatient deve ser usado dentro de um PatientProvider");
  }
  return context;
};
