// src/pages/Appointments/AppointmentList.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppointments } from "../../hooks/useAppointments";
import AppointmentList from "./index";
import { AppointmentStatus, Appointment } from "../../types/Appointment";

// Mock dos hooks e navegação
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
    {
      id: 2,
      patientId: 3,
      patientName: "Maria",
      doctorId: 4,
      doctorName: "Dr. Carlos",
      appointmentDate: "2025-09-01T10:00:00Z",
      status: AppointmentStatus.Scheduled,
      notes: "",
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

    mockAppointments.forEach(a => {
      expect(screen.getByText(`${a.id}`)).toBeInTheDocument();
      expect(screen.getByText(a.patientName || "—")).toBeInTheDocument();
    });
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

    // Filtra por paciente
    fireEvent.change(input, { target: { value: "joão" } });
    expect(screen.getByText("João")).toBeInTheDocument();
    expect(screen.queryByText("Maria")).not.toBeInTheDocument();

    // Filtra por paciente que não existe
    fireEvent.change(input, { target: { value: "não existe" } });
    expect(screen.queryByText("João")).not.toBeInTheDocument();
    expect(screen.queryByText("Maria")).not.toBeInTheDocument();
  });

  it("navega ao clicar em Nova Consulta", () => {
    render(<AppointmentList />);
    fireEvent.click(screen.getByText("Nova Consulta"));
    expect(navigateMock).toHaveBeenCalledWith("/appointments/create");
  });

  it("chama deleteAppointment ao confirmar exclusão", () => {
    window.confirm = jest.fn(() => true);
    render(<AppointmentList />);
    fireEvent.click(screen.getAllByText("Excluir")[0]);
    expect(navigateMock).toHaveBeenCalledWith("/appointments/delete/1");
  });

  it("não chama deleteAppointment se cancelar exclusão", () => {
    window.confirm = jest.fn(() => false);
    render(<AppointmentList />);
    fireEvent.click(screen.getAllByText("Excluir")[0]);
    expect(deleteAppointmentMock).not.toHaveBeenCalled();
  });

  it("links de detalhes e edição apontam para URLs corretas", () => {
    render(<AppointmentList />);
    const firstAppointment = mockAppointments[0];

    // Detalhes
    const detailsLink = screen.getByText("Detalhes").closest("a")!;
    expect(detailsLink).toHaveAttribute("href", `/appointments/${firstAppointment.id}`);

    // Editar
    const editLink = screen.getByText("Editar").closest("a")!;
    expect(editLink).toHaveAttribute("href", `/appointments/edit/${firstAppointment.id}`);
  });
});
