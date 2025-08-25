// src/pages/Appointments/Delete/DeleteAppointment.test.tsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeleteAppointment from "./DeleteAppointment";
import { useAppointments } from "../../../hooks/useAppointments";
import { useNavigate, useParams } from "react-router-dom";
import { AppointmentStatus } from "../../../types/Appointment";

// Mock hooks
jest.mock("../../../hooks/useAppointments");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

describe("DeleteAppointment", () => {
  const mockDeleteAppointment = jest.fn();
  const mockNavigate = jest.fn();

  const appointment = {
    id: 1,
    patientId: 1,
    patientName: "João Silva",
    doctorId: 2,
    doctorName: "Dra. Ana",
    appointmentDate: "2025-08-21T14:30:00Z",
    status: AppointmentStatus.Confirmed,
    notes: "Teste",
  };

  beforeEach(() => {
    (useAppointments as jest.Mock).mockReturnValue({
      appointments: [appointment],
      deleteAppointment: mockDeleteAppointment,
    });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    jest.clearAllMocks();
  });

  it("renderiza os detalhes da consulta", () => {
    render(<DeleteAppointment />);

    expect(screen.getByText("Excluir Consulta")).toBeInTheDocument();
    expect(screen.getByText("Tem certeza que deseja excluir esta consulta?")).toBeInTheDocument();
    expect(screen.getByText("João Silva")).toBeInTheDocument();
    expect(screen.getByText("Dra. Ana")).toBeInTheDocument();
    expect(screen.getByText("21/08/2025, 14:30:00")).toBeInTheDocument(); // depende do locale
    expect(screen.getByText("Confirmada")).toBeInTheDocument();
    expect(screen.getByText("Excluir")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("chama deleteAppointment e navegação ao clicar em Excluir", async () => {
    render(<DeleteAppointment />);

    await userEvent.click(screen.getByText("Excluir"));

    expect(mockDeleteAppointment).toHaveBeenCalledWith(1);
    expect(mockNavigate).toHaveBeenCalledWith("/appointments");
  });

  it("botão Cancelar navega sem chamar deleteAppointment", async () => {
    render(<DeleteAppointment />);

    await userEvent.click(screen.getByText("Cancelar"));

    expect(mockDeleteAppointment).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/appointments");
  });

  it("mostra mensagem quando consulta não é encontrada", () => {
    (useAppointments as jest.Mock).mockReturnValue({
      appointments: [],
      deleteAppointment: mockDeleteAppointment,
    });
    (useParams as jest.Mock).mockReturnValue({ id: "999" });

    render(<DeleteAppointment />);

    expect(screen.getByText("Consulta não encontrada.")).toBeInTheDocument();
  });
});
