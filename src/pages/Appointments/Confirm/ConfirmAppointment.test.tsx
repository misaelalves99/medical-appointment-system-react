// src/pages/Appointments/ConfirmAppointment.test.tsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmAppointment from "./ConfirmAppointment";
import { useAppointments } from "../../../hooks/useAppointments";
import { useNavigate, useParams } from "react-router-dom";

jest.mock("../../../hooks/useAppointments");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

describe("ConfirmAppointment", () => {
  const mockNavigate = jest.fn();
  const mockConfirmAppointment = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  it("exibe mensagem quando a consulta não é encontrada", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useAppointments as jest.Mock).mockReturnValue({ appointments: [], confirmAppointment: mockConfirmAppointment });

    render(<ConfirmAppointment />);
    expect(screen.getByText("Consulta não encontrada.")).toBeInTheDocument();
  });

  it("renderiza detalhes da consulta corretamente", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useAppointments as jest.Mock).mockReturnValue({
      appointments: [
        {
          id: 1,
          patientId: 5,
          patientName: "João",
          doctorId: 10,
          doctorName: "Dra. Ana",
          appointmentDate: "2025-08-21T10:30:00Z",
        },
      ],
      confirmAppointment: mockConfirmAppointment,
    });

    render(<ConfirmAppointment />);
    expect(screen.getByText("Confirmar Consulta")).toBeInTheDocument();
    expect(screen.getByText(/João/)).toBeInTheDocument();
    expect(screen.getByText(/Dra. Ana/)).toBeInTheDocument();

    // Verifica data/hora aproximada
    expect(screen.getByText(/21\/08\/2025/)).toBeInTheDocument();
    expect(screen.getByText(/10:30/)).toBeInTheDocument();

    // Conferindo itens do UL
    expect(screen.getByText(/Data e Hora:/)).toBeInTheDocument();
    expect(screen.getByText(/Paciente:/)).toBeInTheDocument();
    expect(screen.getByText(/Médico:/)).toBeInTheDocument();
  });

  it("chama confirmAppointment e navigate ao confirmar", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useAppointments as jest.Mock).mockReturnValue({
      appointments: [
        { id: 1, patientId: 5, patientName: "João", doctorId: 10, doctorName: "Dra. Ana", appointmentDate: "2025-08-21T10:30:00Z" },
      ],
      confirmAppointment: mockConfirmAppointment,
    });

    render(<ConfirmAppointment />);
    const button = screen.getByRole("button", { name: /Confirmar/i });
    await userEvent.click(button);

    expect(mockConfirmAppointment).toHaveBeenCalledWith(1);
    expect(mockNavigate).toHaveBeenCalledWith("/appointments");
  });

  it("botão 'Cancelar' chama navigate sem confirmar", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useAppointments as jest.Mock).mockReturnValue({
      appointments: [
        { id: 1, patientId: 5, patientName: "João", doctorId: 10, doctorName: "Dra. Ana", appointmentDate: "2025-08-21T10:30:00Z" },
      ],
      confirmAppointment: mockConfirmAppointment,
    });

    render(<ConfirmAppointment />);
    const cancelButton = screen.getByRole("button", { name: /Cancelar/i });
    await userEvent.click(cancelButton);

    expect(mockConfirmAppointment).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/appointments");
  });

  it("exibe IDs quando paciente ou médico não possuem nome", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useAppointments as jest.Mock).mockReturnValue({
      appointments: [
        { id: 1, patientId: 5, patientName: "", doctorId: 10, doctorName: "", appointmentDate: "2025-08-21T10:30:00Z" },
      ],
      confirmAppointment: mockConfirmAppointment,
    });

    render(<ConfirmAppointment />);
    expect(screen.getByText("ID 5")).toBeInTheDocument();
    expect(screen.getByText("ID 10")).toBeInTheDocument();
  });
});
