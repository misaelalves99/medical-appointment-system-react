// src/pages/Appointments/Edit/EditAppointment.test.tsx

import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppointments } from "../../../hooks/useAppointments";
import EditAppointment from "./EditAppointment";
import { AppointmentStatus } from "../../../types/Appointment";

// Mock dos hooks
jest.mock("../../../hooks/useAppointments");
jest.mock("../../../hooks/usePatient", () => ({
  usePatient: jest.fn(() => ({ patients: [{ id: 1, name: "João" }, { id: 2, name: "Maria" }] })),
}));
jest.mock("../../../hooks/useDoctor", () => ({
  useDoctor: jest.fn(() => ({ doctors: [{ id: 1, name: "Dr. Ana" }, { id: 2, name: "Dr. Carlos" }] })),
}));
jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

describe("EditAppointment", () => {
  const appointment = {
    id: 1,
    patientId: 1,
    doctorId: 2,
    appointmentDate: "2025-08-21T14:30:00Z",
    status: AppointmentStatus.Confirmed,
    notes: "Consulta importante",
  };

  const updateAppointmentMock = jest.fn();
  const navigateMock = jest.fn();

  beforeEach(() => {
    (useAppointments as jest.Mock).mockReturnValue({
      appointments: [appointment],
      updateAppointment: updateAppointmentMock,
    });
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("preenche o formulário com os dados existentes", () => {
    render(<EditAppointment />);
    
    expect(screen.getByLabelText("Paciente")).toHaveValue(appointment.patientId.toString());
    expect(screen.getByLabelText("Médico")).toHaveValue(appointment.doctorId.toString());
    expect(screen.getByLabelText("Data da Consulta")).toHaveValue(appointment.appointmentDate.slice(0,16));
    expect(screen.getByLabelText("Status")).toHaveValue(appointment.status.toString());
    expect(screen.getByLabelText("Observações")).toHaveValue(appointment.notes);
  });

  it("atualiza os valores do formulário quando o usuário digita/seleciona", () => {
    render(<EditAppointment />);

    fireEvent.change(screen.getByLabelText("Paciente"), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText("Médico"), { target: { value: "1" } });
    fireEvent.change(screen.getByLabelText("Data da Consulta"), { target: { value: "2025-09-01T10:00" } });
    fireEvent.change(screen.getByLabelText("Status"), { target: { value: AppointmentStatus.Cancelled.toString() } });
    fireEvent.change(screen.getByLabelText("Observações"), { target: { value: "Novo texto" } });

    expect(screen.getByLabelText("Paciente")).toHaveValue("2");
    expect(screen.getByLabelText("Médico")).toHaveValue("1");
    expect(screen.getByLabelText("Data da Consulta")).toHaveValue("2025-09-01T10:00");
    expect(screen.getByLabelText("Status")).toHaveValue(AppointmentStatus.Cancelled.toString());
    expect(screen.getByLabelText("Observações")).toHaveValue("Novo texto");
  });

  it("chama updateAppointment e navega ao submeter o formulário", () => {
    render(<EditAppointment />);
    fireEvent.click(screen.getByText("Salvar"));

    expect(updateAppointmentMock).toHaveBeenCalledWith({
      id: appointment.id,
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      appointmentDate: new Date(appointment.appointmentDate).toISOString(),
      status: appointment.status,
      notes: appointment.notes,
    });

    expect(navigateMock).toHaveBeenCalledWith("/appointments");
  });

  it("navega para /appointments ao clicar em Cancelar", () => {
    render(<EditAppointment />);
    fireEvent.click(screen.getByText("Cancelar"));
    expect(navigateMock).toHaveBeenCalledWith("/appointments");
  });

  it("não quebra se a consulta não for encontrada", () => {
    (useAppointments as jest.Mock).mockReturnValue({ appointments: [], updateAppointment: updateAppointmentMock });
    render(<EditAppointment />);

    expect(screen.getByLabelText("Paciente")).toHaveValue("");
    expect(screen.getByLabelText("Médico")).toHaveValue("");
    expect(screen.getByLabelText("Data da Consulta")).toHaveValue("");
    expect(screen.getByLabelText("Status")).toHaveValue("");
    expect(screen.getByLabelText("Observações")).toHaveValue("");
  });

  it("mostra corretamente todos os status disponíveis", () => {
    const statuses = [
      { value: AppointmentStatus.Scheduled, label: "Agendada" },
      { value: AppointmentStatus.Confirmed, label: "Confirmada" },
      { value: AppointmentStatus.Cancelled, label: "Cancelada" },
      { value: AppointmentStatus.Completed, label: "Concluída" },
    ];

    statuses.forEach(({ value, label }) => {
      (useAppointments as jest.Mock).mockReturnValue({
        appointments: [{ ...appointment, status: value }],
        updateAppointment: updateAppointmentMock,
      });

      render(<EditAppointment />);
      expect(screen.getByLabelText("Status")).toHaveValue(value.toString());
      const option = screen.getByText(label) as HTMLOptionElement;
      expect(option).toBeInTheDocument();
      cleanup(); // Limpa antes do próximo loop
    });
  });
});
