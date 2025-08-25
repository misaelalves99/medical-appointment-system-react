// src/pages/Appointments/ConfirmAppointment.test.tsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmAppointment from "./ConfirmAppointment";
import { useAppointments } from "../../../hooks/useAppointments";
import { useNavigate, useParams } from "react-router-dom";

// Mock dos hooks
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

  it("renderiza os detalhes da consulta corretamente", () => {
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
    expect(screen.getByText(/21\/08\/2025/)).toBeInTheDocument(); // Data formatada pt-BR
  });

  it("chama confirmAppointment e navigate ao confirmar", async () => {
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

    const button = screen.getByText("Confirmar");
    await userEvent.click(button);

    expect(mockConfirmAppointment).toHaveBeenCalledWith(1);
    expect(mockNavigate).toHaveBeenCalledWith("/appointments");
  });

  it("botão 'Cancelar' chama navigate sem confirmar", async () => {
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

    const backButton = screen.getByText("Cancelar");
    await userEvent.click(backButton);

    expect(mockConfirmAppointment).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/appointments");
  });

  it("exibe IDs quando paciente ou médico não possuem nome", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useAppointments as jest.Mock).mockReturnValue({
      appointments: [
        {
          id: 1,
          patientId: 5,
          patientName: "",
          doctorId: 10,
          doctorName: "",
          appointmentDate: "2025-08-21T10:30:00Z",
        },
      ],
      confirmAppointment: mockConfirmAppointment,
    });

    render(<ConfirmAppointment />);

    expect(screen.getByText("ID 5")).toBeInTheDocument();
    expect(screen.getByText("ID 10")).toBeInTheDocument();
  });
});
