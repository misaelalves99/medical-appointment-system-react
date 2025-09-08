// src/contexts/SpecialtyContext.tsx
import { createContext } from "react";
import type { Specialty } from "../types/Specialty";

export interface SpecialtyContextType {
  specialties: Specialty[];
  addSpecialty: (name: string) => void;
  updateSpecialty: (id: number, name: string) => void;
  removeSpecialty: (id: number) => void;
}

export const SpecialtyContext = createContext<SpecialtyContextType>({
  specialties: [],
  addSpecialty: () => {},
  updateSpecialty: () => {},
  removeSpecialty: () => {},
});
