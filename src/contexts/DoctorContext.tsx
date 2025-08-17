// src/contexts/DoctorContext.tsx

import { createContext } from "react";
import type { Doctor } from "../types/Doctor";

export interface DoctorContextType {
  doctors: Doctor[];
  addDoctor: (doctor: Doctor) => void;
  updateDoctor: (doctor: Doctor) => void;
  removeDoctor: (id: number) => void;
}

export const DoctorContext = createContext<DoctorContextType>({
  doctors: [],
  addDoctor: () => {},
  updateDoctor: () => {},
  removeDoctor: () => {},
});
