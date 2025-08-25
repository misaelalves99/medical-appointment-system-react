// src/pages/Appointments/AppointmentForm.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppointments } from "../../hooks/useAppointments";
import AppointmentForm from "./AppointmentForm";
import { AppointmentStatus } from "../../types/Appointment";

// Mock hooks e navegação
jest.mock("../../hooks/useAppointments");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

describe("AppointmentForm", () => {
  const addAppointmentMock = jest.fn();
  const updateAppointmentMock = jest.fn();
  const navigateMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppointments as jest.Mock).mockReturnValue({
      appointments: [
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
      ],
      addAppointment: addAppointmentMock,
      updateAppointment: updateAppointmentMock,
    });
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
  });

  it("renderiza corretamente no modo create", () => {
    render(<AppointmentForm mode="create" />);
    expect(screen.getByText("Nova Consulta")).toBeInTheDocument();
    expect(screen.getByLabelText("Paciente (ID)")).toBeInTheDocument();
    expect(screen.getByLabelText("Médico (ID)")).toBeInTheDocument();
  });

  it("valida campos obrigatórios antes de enviar", () => {
    render(<AppointmentForm mode="create" />);
    fireEvent.change(screen.getByLabelText("Paciente (ID)"), { target: { value: "0" } });
    fireEvent.change(screen.getByLabelText("Médico (ID)"), { target: { value: "0" } });
    fireEvent.change(screen.getByLabelText("Data e Hora"), { target: { value: "" } });

    fireEvent.click(screen.getByText("Salvar"));

    expect(screen.getByText("Paciente é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("Médico é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("Data e hora são obrigatórias")).toBeInTheDocument();
    expect(addAppointmentMock).not.toHaveBeenCalled();
    expect(updateAppointmentMock).not.toHaveBeenCalled();
  });

  it("chama addAppointment e navega ao submeter em create", () => {
    render(<AppointmentForm mode="create" />);

    fireEvent.change(screen.getByLabelText("Paciente (ID)"), { target: { value: "1" } });
    fireEvent.change(screen.getByLabelText("Médico (ID)"), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText("Data e Hora"), { target: { value: "2025-08-21T14:30" } });

    fireEvent.click(screen.getByText("Salvar"));

    expect(addAppointmentMock).toHaveBeenCalled();
    expect(navigateMock).toHaveBeenCalledWith("/appointments");
  });

  it("preenche o formulário em modo edit", () => {
    render(<AppointmentForm mode="edit" />);
    expect(screen.getByDisplayValue("1")).toBeInTheDocument(); // pacienteId
    expect(screen.getByDisplayValue("2")).toBeInTheDocument(); // doctorId
    expect(screen.getByDisplayValue("Consulta teste")).toBeInTheDocument(); // notes
  });

  it("chama updateAppointment e navega ao submeter em edit", () => {
    render(<AppointmentForm mode="edit" />);
    fireEvent.click(screen.getByText("Salvar"));

    expect(updateAppointmentMock).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
    expect(navigateMock).toHaveBeenCalledWith("/appointments");
  });

  it("navega ao clicar em Cancelar", () => {
    render(<AppointmentForm mode="create" />);
    fireEvent.click(screen.getByText("Cancelar"));
    expect(navigateMock).toHaveBeenCalledWith("/appointments");
  });
});
