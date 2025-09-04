// src/pages/Appointment/Details/DetailsAppointment.test.tsx

import { render, screen } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { useAppointments } from "../../../hooks/useAppointments";
import AppointmentDetails from "./DetailsAppointment";

// Mock dos hooks
jest.mock("../../../hooks/useAppointments");
jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe("AppointmentDetails", () => {
  const appointment = {
    id: 1,
    patientId: 1,
    patientName: "João Silva",
    doctorId: 2,
    doctorName: "Dra. Ana",
    appointmentDate: "2025-08-21T14:30:00Z",
    status: 1, // Confirmed
    notes: "Consulta importante",
  };

  beforeEach(() => {
    (useAppointments as jest.Mock).mockReturnValue({
      appointments: [appointment],
    });
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
  });

  it("renderiza os detalhes da consulta corretamente", () => {
    render(<AppointmentDetails />);

    // Títulos e rótulos
    expect(screen.getByText("Detalhes da Consulta")).toBeInTheDocument();
    expect(screen.getByText("Paciente")).toBeInTheDocument();
    expect(screen.getByText("Médico")).toBeInTheDocument();
    expect(screen.getByText("Data e Hora")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();

    // Conteúdo
    expect(screen.getByText("João Silva")).toBeInTheDocument();
    expect(screen.getByText("Dra. Ana")).toBeInTheDocument();
    expect(screen.getByText(new Date(appointment.appointmentDate).toLocaleString("pt-BR"))).toBeInTheDocument();
    expect(screen.getByText("Confirmada")).toBeInTheDocument();

    // Observações
    expect(screen.getByText("Observações:")).toBeInTheDocument();
    expect(screen.getByText("Consulta importante")).toBeInTheDocument();

    // Links
    expect(screen.getByText("Editar").getAttribute("href")).toBe(`/appointments/edit/${appointment.id}`);
    expect(screen.getByText("Voltar").getAttribute("href")).toBe("/appointments");
  });

  it("exibe IDs quando paciente ou médico não possuem nome", () => {
    const appointmentNoNames = {
      ...appointment,
      patientName: "",
      doctorName: "",
    };
    (useAppointments as jest.Mock).mockReturnValue({ appointments: [appointmentNoNames] });
    render(<AppointmentDetails />);

    expect(screen.getByText(`ID ${appointmentNoNames.patientId}`)).toBeInTheDocument();
    expect(screen.getByText(`ID ${appointmentNoNames.doctorId}`)).toBeInTheDocument();
  });

  it("mostra mensagem quando a consulta não é encontrada", () => {
    (useAppointments as jest.Mock).mockReturnValue({ appointments: [] });
    (useParams as jest.Mock).mockReturnValue({ id: "999" });

    render(<AppointmentDetails />);
    expect(screen.getByText("Consulta não encontrada.")).toBeInTheDocument();
  });

  it("mostra status 'Agendada', 'Cancelada' e 'Concluída' corretamente", () => {
    const statuses = [
      { status: 0, label: "Agendada" },
      { status: 2, label: "Cancelada" },
      { status: 3, label: "Concluída" },
    ];

    statuses.forEach(({ status, label }) => {
      (useAppointments as jest.Mock).mockReturnValue({
        appointments: [{ ...appointment, status }],
      });
      render(<AppointmentDetails />);
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
