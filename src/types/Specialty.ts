// src/types/Specialty.ts

export interface Specialty {
  id: number;
  name: string;
}

export interface SpecialtyContextType {
  specialties: Specialty[];
  addSpecialty: (name: string) => void;
  updateSpecialty: (id: number, name: string) => void;
  removeSpecialty: (id: number) => void;
}
