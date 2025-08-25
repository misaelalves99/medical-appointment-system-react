// src/pages/Appointments/Create/CreateAppointment.test.tsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateAppointment from "./CreateAppointment";
import { useAppointments } from "../../../hooks/useAppointments";
import { useNavigate } from "react-router-dom";

// Mock hooks
jest.mock("../../../hooks/useAppointments");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("CreateAppointment", () => {
  const mockAddAppointment = jest.fn();
  const mockNavigate = jest.fn();

  // Pacientes, médicos e status com value como string
  const patients = [
    { value: "1", label: "João" },
    { value: "2", label: "Maria" },
  ];

  const doctors = [
    { value: "1", label: "Dr. Ana" },
    { value: "2", label: "Dr. Carlos" },
  ];

  const statusOptions = [
    { value: "0", label: "Agendada" },
    { value: "1", label: "Confirmada" },
  ];

  beforeEach(() => {
    (useAppointments as jest.Mock).mockReturnValue({
      addAppointment: mockAddAppointment,
    });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  it("renderiza todos os campos e botões", () => {
    render(<CreateAppointment patients={patients} doctors={doctors} statusOptions={statusOptions} />);

    expect(screen.getByLabelText("Paciente")).toBeInTheDocument();
    expect(screen.getByLabelText("Médico")).toBeInTheDocument();
    expect(screen.getByLabelText("Data da Consulta")).toBeInTheDocument();
    expect(screen.getByLabelText("Status")).toBeInTheDocument();
    expect(screen.getByLabelText("Observações")).toBeInTheDocument();
    expect(screen.getByText("Salvar")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("atualiza os valores do formulário ao digitar/selecionar", async () => {
    render(<CreateAppointment patients={patients} doctors={doctors} statusOptions={statusOptions} />);

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
    render(<CreateAppointment patients={patients} doctors={doctors} statusOptions={statusOptions} />);

    await userEvent.selectOptions(screen.getByLabelText("Paciente"), "1");
    await userEvent.selectOptions(screen.getByLabelText("Médico"), "2");
    await userEvent.type(screen.getByLabelText("Data da Consulta"), "2025-08-21T14:00");
    await userEvent.selectOptions(screen.getByLabelText("Status"), "0");
    await userEvent.type(screen.getByLabelText("Observações"), "Observação teste");

    await userEvent.click(screen.getByText("Salvar"));

    expect(mockAddAppointment).toHaveBeenCalledWith({
      patientId: 1,
      patientName: "",
      doctorId: 2,
      doctorName: "",
      appointmentDate: "2025-08-21T14:00",
      status: 0,
      notes: "Observação teste",
    });

    expect(mockNavigate).toHaveBeenCalledWith("/appointments");
  });

  it("botão cancelar navega sem chamar addAppointment", async () => {
    render(<CreateAppointment patients={patients} doctors={doctors} statusOptions={statusOptions} />);

    await userEvent.click(screen.getByText("Cancelar"));

    expect(mockAddAppointment).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/appointments");
  });
});
