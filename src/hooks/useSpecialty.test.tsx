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
  });

  it("deve chamar addSpecialty corretamente", () => {
    const { result } = renderHook(() => useSpecialty(), { wrapper });

    act(() => {
      result.current.addSpecialty("Cardiologia");
    });

    expect(mockContext.addSpecialty).toHaveBeenCalledWith("Cardiologia");
  });

  it("deve chamar updateSpecialty corretamente", () => {
    const { result } = renderHook(() => useSpecialty(), { wrapper });

    act(() => {
      result.current.updateSpecialty(1, "Neurologia");
    });

    expect(mockContext.updateSpecialty).toHaveBeenCalledWith(1, "Neurologia");
  });

  it("deve chamar removeSpecialty corretamente", () => {
    const { result } = renderHook(() => useSpecialty(), { wrapper });

    act(() => {
      result.current.removeSpecialty(1);
    });

    expect(mockContext.removeSpecialty).toHaveBeenCalledWith(1);
  });
});
