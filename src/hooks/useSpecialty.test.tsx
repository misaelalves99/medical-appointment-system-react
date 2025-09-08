// src/hooks/useSpecialty.test.tsx
import { renderHook, act } from "@testing-library/react";
import React from "react";
import { SpecialtyContext, SpecialtyContextType } from "../contexts/SpecialtyContext";
import { useSpecialty } from "./useSpecialty";

describe("useSpecialty hook", () => {
  const mockContext: SpecialtyContextType = {
    specialties: [],
    addSpecialty: jest.fn(),
    updateSpecialty: jest.fn(),
    removeSpecialty: jest.fn(),
  };

  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <SpecialtyContext.Provider value={mockContext}>{children}</SpecialtyContext.Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar o contexto de especialidades", () => {
    const { result } = renderHook(() => useSpecialty(), { wrapper });
    expect(result.current).toBe(mockContext);
    expect(result.current.specialties).toEqual([]);
  });

  it("deve chamar addSpecialty corretamente", () => {
    const { result } = renderHook(() => useSpecialty(), { wrapper });

    act(() => result.current.addSpecialty("Cardiologia"));

    expect(mockContext.addSpecialty).toHaveBeenCalledWith("Cardiologia");
    expect(mockContext.addSpecialty).toHaveBeenCalledTimes(1);
  });

  it("deve chamar updateSpecialty corretamente", () => {
    const { result } = renderHook(() => useSpecialty(), { wrapper });

    act(() => result.current.updateSpecialty(1, "Neurologia"));

    expect(mockContext.updateSpecialty).toHaveBeenCalledWith(1, "Neurologia");
    expect(mockContext.updateSpecialty).toHaveBeenCalledTimes(1);
  });

  it("deve chamar removeSpecialty corretamente", () => {
    const { result } = renderHook(() => useSpecialty(), { wrapper });

    act(() => result.current.removeSpecialty(1));

    expect(mockContext.removeSpecialty).toHaveBeenCalledWith(1);
    expect(mockContext.removeSpecialty).toHaveBeenCalledTimes(1);
  });

  it("deve lançar erro se usado fora do SpecialtyProvider", () => {
    const { result } = renderHook(() => useSpecialty());
    expect(() => result.current).toThrow(
      new Error("useSpecialty deve ser usado dentro de um SpecialtyProvider")
    );
  });
});
