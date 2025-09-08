// src/hooks/useSpecialty.tsx

import { useContext } from "react";
import { SpecialtyContext } from "../contexts/SpecialtyContext";

export const useSpecialty = () => {
  const context = useContext(SpecialtyContext);
  if (!context) {
    throw new Error("useSpecialty deve ser usado dentro de um SpecialtyProvider");
  }
  return context;
};
