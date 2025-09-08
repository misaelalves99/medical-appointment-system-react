// src/pages/Appointments/Create/CreateAppointment.test.tsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateAppointment from "./CreateAppointment";
import { useAppointments } from "../../../hooks/useAppointments";
import { usePatient } from "../../../hooks/usePatient";
import { useDoctor } from "../../../hooks/useDoctor";
import { useNavigate } from "react-router-dom";

jest.mock("../../../hooks/useAppointments");
jest.mock("../../../hooks/usePatient");
jest.mock("../../../hooks/useDoctor");
jest.mock("react-router-dom", () => ({ useNavigate: jest.fn() }));

describe("CreateAppointment", () => {
  const mockAddAppointment = jest.fn();
  const mockNavigate = jest.fn();

  const mockPatients = [
    { id: 1, name: "João" },
    { id: 2, name: "Maria" },
  ];

  const mockDoctors = [
    { id: 1, name: "Dr. Ana" },
    { id: 2, name: "Dr. Carlos" },
  ];

  beforeEach(() => {
    (useAppointments as jest.Mock).mockReturnValue({ addAppointment: mockAddAppointment });
    (usePatient as jest.Mock).mockReturnValue({ patients: mockPatients });
    (useDoctor as jest.Mock).mockReturnValue({ doctors: mockDoctors });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  it("renderiza todos os campos e botões", () => {
    render(<CreateAppointment />);
    expect(screen.getByLabelText("Paciente")).toBeInTheDocument();
    expect(screen.getByLabelText("Médico")).toBeInTheDocument();
    expect(screen.getByLabelText("Data da Consulta")).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
    expect(screen.getByLabelText("Observações")).toBeInTheDocument();
    expect(screen.getByText("Salvar")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("atualiza os valores do formulário ao digitar/selecionar", async () => {
    render(<CreateAppointment />);

    const patientSelect = screen.getByLabelText("Paciente") as HTMLSelectElement;
    const doctorSelect = screen.getByLabelText("Médico") as HTMLSelectElement;
    const dateInput = screen.getByLabelText("Data da Consulta") as HTMLInputElement;
    const statusSelect = screen.getByLabelText("Status") as HTMLSelectElement;
    const notesInput = screen.getByLabelText("Observações") as HTMLTextAreaElement;

    await userEvent.selectOptions(patientSelect, "2");
    await userEvent.selectOptions(doctorSelect, "1");
    await userEvent.type(dateInput, "2025-08-21T10:30");
    await userEvent.selectOptions(statusSelect, "1");
    await userEvent.type(notesInput, "Consulta importante");

    expect(patientSelect.value).toBe("2");
    expect(doctorSelect.value).toBe("1");
    expect(dateInput.value).toBe("2025-08-21T10:30");
    expect(statusSelect.value).toBe("1");
    expect(notesInput.value).toBe("Consulta importante");
  });

  it("chama addAppointment e navegação ao submeter o formulário", async () => {
    render(<CreateAppointment />);

    await userEvent.selectOptions(screen.getByLabelText("Paciente"), "1");
    await userEvent.selectOptions(screen.getByLabelText("Médico"), "2");
    await userEvent.type(screen.getByLabelText("Data da Consulta"), "2025-08-21T14:00");
    await userEvent.selectOptions(screen.getByLabelText("Status"), "1"); // "1" = Agendado
    await userEvent.type(screen.getByLabelText("Observações"), "Observação teste");

    await userEvent.click(screen.getByText("Salvar"));

    expect(mockAddAppointment).toHaveBeenCalledWith({
      patientId: 1,
      patientName: "João",
      doctorId: 2,
      doctorName: "Dr. Carlos",
      appointmentDate: "2025-08-21T14:00",
      status: 1, // number coerced do select
      notes: "Observação teste",
    });

    expect(mockNavigate).toHaveBeenCalledWith("/appointments");
  });

  it("botão cancelar navega sem chamar addAppointment", async () => {
    render(<CreateAppointment />);
    await userEvent.click(screen.getByText("Cancelar"));

    expect(mockAddAppointment).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/appointments");
  });
});
