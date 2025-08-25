// src/pages/Appointments/AppointmentList.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppointments } from "../../hooks/useAppointments";
import AppointmentList from "./index";
import { AppointmentStatus, Appointment } from "../../types/Appointment";

// Mock hooks e navegação
jest.mock("../../hooks/useAppointments");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>,
}));

describe("AppointmentList", () => {
  const deleteAppointmentMock = jest.fn();
  const navigateMock = jest.fn();

  const mockAppointments: Appointment[] = [
    {
      id: 1,
      patientId: 1,
      patientName: "João",
      doctorId: 2,
      doctorName: "Dr. Ana",
      appointmentDate: "2025-08-21T14:30:00Z",
      status: AppointmentStatus.Confirmed,
      notes: "Consulta teste",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppointments as jest.Mock).mockReturnValue({
      appointments: mockAppointments,
      deleteAppointment: deleteAppointmentMock,
    });
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  it("renderiza corretamente com appointments", () => {
    render(<AppointmentList />);
    expect(screen.getByText("Lista de Consultas")).toBeInTheDocument();
    expect(screen.getByText("Paciente ID: 1")).toBeInTheDocument();
    expect(screen.getByText("Médico ID: 2")).toBeInTheDocument();
    expect(screen.getByText("Confirmada")).toBeInTheDocument();
  });

  it("exibe mensagem quando não há appointments", () => {
    (useAppointments as jest.Mock).mockReturnValue({
      appointments: [],
      deleteAppointment: deleteAppointmentMock,
    });
    render(<AppointmentList />);
    expect(screen.getByText("Nenhuma consulta cadastrada.")).toBeInTheDocument();
  });

  it("filtra appointments via search", () => {
    render(<AppointmentList />);
    const input = screen.getByPlaceholderText(/Pesquisar por/i);
    fireEvent.change(input, { target: { value: "joão" } });
    expect(screen.getByText("Paciente ID: 1")).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "não existe" } });
    expect(screen.queryByText("Paciente ID: 1")).not.toBeInTheDocument();
  });

  it("navega ao clicar em Nova Consulta", () => {
    render(<AppointmentList />);
    fireEvent.click(screen.getByText("Nova Consulta"));
    expect(navigateMock).toHaveBeenCalledWith("/appointments/create");
  });

  it("chama deleteAppointment ao confirmar exclusão", () => {
    window.confirm = jest.fn(() => true);
    render(<AppointmentList />);
    fireEvent.click(screen.getByText("Excluir"));
    expect(deleteAppointmentMock).toHaveBeenCalledWith(1);
  });

  it("não chama deleteAppointment se cancelar exclusão", () => {
    window.confirm = jest.fn(() => false);
    render(<AppointmentList />);
    fireEvent.click(screen.getByText("Excluir"));
    expect(deleteAppointmentMock).not.toHaveBeenCalled();
  });

  it("links de detalhes e edição apontam para URLs corretas", () => {
    render(<AppointmentList />);
    expect(screen.getByText("Detalhes").closest("a")).toHaveAttribute("href", "/appointments/1");
    expect(screen.getByText("Editar").closest("a")).toHaveAttribute("href", "/appointments/edit/1");
  });
});
