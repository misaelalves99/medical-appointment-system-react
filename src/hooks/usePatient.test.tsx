// src/hooks/usePatient.test.tsx
import { renderHook, act } from "@testing-library/react";
import React from "react";
import { PatientContext, PatientContextType } from "../contexts/PatientContext";
import { usePatient } from "./usePatient";
import type { Patient } from "../types/Patient";

describe("usePatient hook", () => {
  const mockContext: PatientContextType = {
    patients: [],
    addPatient: jest.fn(),
    updatePatient: jest.fn(),
    deletePatient: jest.fn(),
    updatePatientProfilePicture: jest.fn(),
  };

  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <PatientContext.Provider value={mockContext}>{children}</PatientContext.Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar o contexto de pacientes dentro do provider", () => {
    const { result } = renderHook(() => usePatient(), { wrapper });
    expect(result.current).toBe(mockContext);
    expect(result.current.patients).toEqual([]);
  });

  it("deve chamar addPatient corretamente", () => {
    const { result } = renderHook(() => usePatient(), { wrapper });

    const newPatient: Omit<Patient, "id"> = {
      name: "Paciente Teste",
      cpf: "123.456.789-00",
      dateOfBirth: "2000-01-01",
      email: "teste@paciente.com",
      phone: "11999999999",
      address: "Rua Teste, 123",
    };

    act(() => result.current.addPatient(newPatient));

    expect(mockContext.addPatient).toHaveBeenCalledWith(newPatient);
    expect(mockContext.addPatient).toHaveBeenCalledTimes(1);
  });

  it("deve chamar updatePatient corretamente", () => {
    const { result } = renderHook(() => usePatient(), { wrapper });

    const updatedPatient: Patient = {
      id: 1,
      name: "Paciente Atualizado",
      cpf: "123.456.789-00",
      dateOfBirth: "2000-01-01",
      email: "teste@paciente.com",
      phone: "11999999999",
      address: "Rua Teste, 123",
    };

    act(() => result.current.updatePatient(updatedPatient));

    expect(mockContext.updatePatient).toHaveBeenCalledWith(updatedPatient);
    expect(mockContext.updatePatient).toHaveBeenCalledTimes(1);
  });

  it("deve chamar deletePatient corretamente", () => {
    const { result } = renderHook(() => usePatient(), { wrapper });

    act(() => result.current.deletePatient(1));

    expect(mockContext.deletePatient).toHaveBeenCalledWith(1);
    expect(mockContext.deletePatient).toHaveBeenCalledTimes(1);
  });

  it("deve chamar updatePatientProfilePicture corretamente", () => {
    const { result } = renderHook(() => usePatient(), { wrapper });

    const profilePath = "/path/to/foto.png";

    act(() => result.current.updatePatientProfilePicture(1, profilePath));

    expect(mockContext.updatePatientProfilePicture).toHaveBeenCalledWith(1, profilePath);
    expect(mockContext.updatePatientProfilePicture).toHaveBeenCalledTimes(1);
  });

  it("deve lançar erro se usado fora do PatientProvider", () => {
    const { result } = renderHook(() => usePatient());
    expect(() => result.current).toThrow(
      new Error("usePatient deve ser usado dentro de um PatientProvider")
    );
  });
});
