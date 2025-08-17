// src/hooks/useDoctor.tsx

import { useContext } from "react";
import { DoctorContext } from "../contexts/DoctorContext";

export const useDoctor = () => useContext(DoctorContext);
