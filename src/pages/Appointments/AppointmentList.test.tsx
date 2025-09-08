// src/pages/Appointments/AppointmentList.test.tsx

import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppointments } from "../../hooks/useAppointments";
import AppointmentList from "./index";
import { AppointmentStatus, Appointment } from "../../types/Appointment";

// Mock dos hooks e navegação
jest.mock("../../hooks/useAppointments");
jest.mock("../../hooks/usePatient", () => ({
  usePatient: jest.fn(() => ({ patients: [{ id: 1, name: "João" }, { id: 3, name: "Maria" }] })),
}));
jest.mock("../../hooks/useDoctor", () => ({
  useDoctor: jest.fn(() => ({ doctors: [{ id: 2, name: "Dr. Ana" }, { id: 4, name: "Dr. Carlos" }] })),
}));
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

  afterEach(() => cleanup());

  it("renderiza corretamente com appointments", () => {
    render(<AppointmentList />);
    expect(screen.getByText("Lista de Consultas")).toBeInTheDocument();

    mockAppointments.forEach(a => {
      expect(screen.getByText(`${a.id}`)).toBeInTheDocument();
      expect(screen.getByText(a.patientName ?? "—")).toBeInTheDocument();
      expect(screen.getByText(a.doctorName ?? "—")).toBeInTheDocument();
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

  it("filtra appointments via search corretamente", () => {
    render(<AppointmentList />);
    const input = screen.getByPlaceholderText(/Pesquisar por/i);

    // Filtra por paciente
    fireEvent.change(input, { target: { value: "joão" } });
    expect(screen.getByText("João")).toBeInTheDocument();
    expect(screen.queryByText("Maria")).not.toBeInTheDocument();

    // Filtra por médico
    fireEvent.change(input, { target: { value: "Dr. Carlos".toLowerCase() } });
    expect(screen.getByText("Maria")).toBeInTheDocument();
    expect(screen.queryByText("João")).not.toBeInTheDocument();

    // Filtra por status
    fireEvent.change(input, { target: { value: "confirmada" } });
    expect(screen.getByText("João")).toBeInTheDocument();
    expect(screen.queryByText("Maria")).not.toBeInTheDocument();

    // Filtro vazio retorna todos
    fireEvent.change(input, { target: { value: "" } });
    expect(screen.getByText("João")).toBeInTheDocument();
    expect(screen.getByText("Maria")).toBeInTheDocument();
  });

  it("navega ao clicar em Nova Consulta", () => {
    render(<AppointmentList />);
    fireEvent.click(screen.getByText("Nova Consulta"));
    expect(navigateMock).toHaveBeenCalledWith("/appointments/create");
  });

  it("navega para a página de exclusão ao clicar em Excluir", () => {
    render(<AppointmentList />);
    fireEvent.click(screen.getAllByText("Excluir")[0]);
    expect(navigateMock).toHaveBeenCalledWith("/appointments/delete/1");
  });

  it("links de detalhes e edição apontam para URLs corretas", () => {
    render(<AppointmentList />);
    const firstAppointment = mockAppointments[0];

    const detailsLink = screen.getByText("Detalhes").closest("a")!;
    expect(detailsLink).toHaveAttribute("href", `/appointments/${firstAppointment.id}`);

    const editLink = screen.getByText("Editar").closest("a")!;
    expect(editLink).toHaveAttribute("href", `/appointments/edit/${firstAppointment.id}`);
  });
});
