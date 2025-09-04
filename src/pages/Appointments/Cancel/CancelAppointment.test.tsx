// src/pages/Appointments/CancelAppointment.test.tsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CancelAppointment from "./CancelAppointment";
import { useAppointments } from "../../../hooks/useAppointments";
import { useNavigate, useParams } from "react-router-dom";

jest.mock("../../../hooks/useAppointments");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

describe("CancelAppointment", () => {
  const mockNavigate = jest.fn();
  const mockCancelAppointment = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  it("exibe mensagem quando a consulta não é encontrada", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useAppointments as jest.Mock).mockReturnValue({ appointments: [], cancelAppointment: mockCancelAppointment });

    render(<CancelAppointment />);
    expect(screen.getByText("Consulta não encontrada.")).toBeInTheDocument();
  });

  it("renderiza detalhes da consulta corretamente com data formatada", () => {
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
      cancelAppointment: mockCancelAppointment,
    });

    render(<CancelAppointment />);

    expect(screen.getByText("Cancelar Consulta")).toBeInTheDocument();
    expect(screen.getByText(/João/)).toBeInTheDocument();
    expect(screen.getByText(/Dra. Ana/)).toBeInTheDocument();
    expect(screen.getByText("21/08/2025 10:30:00") || screen.getByText(/21\/08\/2025/)).toBeInTheDocument();
  });

  it("chama cancelAppointment e navigate ao confirmar cancelamento", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useAppointments as jest.Mock).mockReturnValue({
      appointments: [
        { id: 1, patientId: 5, patientName: "João", doctorId: 10, doctorName: "Dra. Ana", appointmentDate: "2025-08-21T10:30:00Z" },
      ],
      cancelAppointment: mockCancelAppointment,
    });

    render(<CancelAppointment />);
    const button = screen.getByRole("button", { name: /Confirmar Cancelamento/i });
    await userEvent.click(button);

    expect(mockCancelAppointment).toHaveBeenCalledWith(1);
    expect(mockNavigate).toHaveBeenCalledWith("/appointments");
  });

  it("botão 'Voltar' chama navigate sem cancelar", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useAppointments as jest.Mock).mockReturnValue({
      appointments: [
        { id: 1, patientId: 5, patientName: "João", doctorId: 10, doctorName: "Dra. Ana", appointmentDate: "2025-08-21T10:30:00Z" },
      ],
      cancelAppointment: mockCancelAppointment,
    });

    render(<CancelAppointment />);
    const backButton = screen.getByRole("button", { name: /Voltar/i });
    await userEvent.click(backButton);

    expect(mockCancelAppointment).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/appointments");
  });

  it("exibe IDs quando paciente ou médico não possuem nome", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useAppointments as jest.Mock).mockReturnValue({
      appointments: [
        { id: 1, patientId: 5, patientName: "", doctorId: 10, doctorName: "", appointmentDate: "2025-08-21T10:30:00Z" },
      ],
      cancelAppointment: mockCancelAppointment,
    });

    render(<CancelAppointment />);
    expect(screen.getByText("ID 5")).toBeInTheDocument();
    expect(screen.getByText("ID 10")).toBeInTheDocument();
  });
});
