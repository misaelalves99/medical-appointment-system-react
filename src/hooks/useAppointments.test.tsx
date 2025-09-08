// src/hooks/useAppointments.test.tsx
import { renderHook, act } from "@testing-library/react";
import React from "react";
import {
  AppointmentsContext,
  AppointmentsContextType,
} from "../contexts/AppointmentsContext";
import { useAppointments } from "./useAppointments";
import { AppointmentStatus } from "../types/Appointment";

describe("useAppointments hook", () => {
  const mockContext: AppointmentsContextType = {
    appointments: [],
    addAppointment: jest.fn(),
    updateAppointment: jest.fn(),
    deleteAppointment: jest.fn(),
    confirmAppointment: jest.fn(),
    cancelAppointment: jest.fn(),
  };

  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <AppointmentsContext.Provider value={mockContext}>
      {children}
    </AppointmentsContext.Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar o contexto de appointments", () => {
    const { result } = renderHook(() => useAppointments(), { wrapper });
    expect(result.current).toBe(mockContext);
    expect(result.current.appointments).toEqual([]);
  });

  it("deve chamar addAppointment corretamente", () => {
    const { result } = renderHook(() => useAppointments(), { wrapper });

    const appointment = {
      patientId: 1,
      doctorId: 1,
      appointmentDate: "2025-01-01",
      status: AppointmentStatus.Scheduled,
    };

    act(() => result.current.addAppointment(appointment));

    expect(mockContext.addAppointment).toHaveBeenCalledWith(appointment);
    expect(mockContext.addAppointment).toHaveBeenCalledTimes(1);
  });

  it("deve chamar updateAppointment corretamente", () => {
    const { result } = renderHook(() => useAppointments(), { wrapper });

    const updatedAppointment = {
      id: 1,
      patientId: 1,
      doctorId: 1,
      appointmentDate: "2025-01-01",
      status: AppointmentStatus.Completed,
    };

    act(() => result.current.updateAppointment(updatedAppointment));

    expect(mockContext.updateAppointment).toHaveBeenCalledWith(updatedAppointment);
    expect(mockContext.updateAppointment).toHaveBeenCalledTimes(1);
  });

  it("deve chamar deleteAppointment corretamente", () => {
    const { result } = renderHook(() => useAppointments(), { wrapper });

    act(() => result.current.deleteAppointment(1));

    expect(mockContext.deleteAppointment).toHaveBeenCalledWith(1);
    expect(mockContext.deleteAppointment).toHaveBeenCalledTimes(1);
  });

  it("deve chamar confirmAppointment corretamente", () => {
    const { result } = renderHook(() => useAppointments(), { wrapper });

    act(() => result.current.confirmAppointment(1));

    expect(mockContext.confirmAppointment).toHaveBeenCalledWith(1);
    expect(mockContext.confirmAppointment).toHaveBeenCalledTimes(1);
  });

  it("deve chamar cancelAppointment corretamente", () => {
    const { result } = renderHook(() => useAppointments(), { wrapper });

    act(() => result.current.cancelAppointment(1));

    expect(mockContext.cancelAppointment).toHaveBeenCalledWith(1);
    expect(mockContext.cancelAppointment).toHaveBeenCalledTimes(1);
  });
});
