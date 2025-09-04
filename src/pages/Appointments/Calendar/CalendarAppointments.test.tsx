import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CalendarAppointments from "./CalendarAppointments";
import { useAppointments } from "../../../hooks/useAppointments";
import { useNavigate } from "react-router-dom";
import { AppointmentStatus } from "../../../types/Appointment";

jest.mock("../../../hooks/useAppointments");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("CalendarAppointments", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza mensagem quando não há consultas", () => {
    (useAppointments as jest.Mock).mockReturnValue({ appointments: [] });

    render(<CalendarAppointments />);

    expect(screen.getByText("Nenhuma consulta cadastrada.")).toBeInTheDocument();
  });

  it("renderiza consultas e ordena por data com todos os campos", () => {
    const appointmentsMock = [
      {
        id: 2,
        patientId: 1,
        patientName: "João",
        doctorId: 3,
        doctorName: "Dr. Ana",
        appointmentDate: "2025-08-20T10:00:00Z",
        status: AppointmentStatus.Scheduled,
      },
      {
        id: 1,
        patientId: 2,
        patientName: "Maria",
        doctorId: 4,
        doctorName: "Dr. Pedro",
        appointmentDate: "2025-08-18T14:30:00Z",
        status: AppointmentStatus.Confirmed,
      },
    ];

    (useAppointments as jest.Mock).mockReturnValue({ appointments: appointmentsMock });

    render(<CalendarAppointments />);

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(3); // 1 header + 2 appointments

    // Conferindo valores formatados
    expect(screen.getByText("18/08/2025")).toBeInTheDocument();
    expect(screen.getByText("14:30")).toBeInTheDocument();
    expect(screen.getByText("Maria")).toBeInTheDocument();
    expect(screen.getByText("Dr. Pedro")).toBeInTheDocument();
    expect(screen.getByText("Confirmada")).toBeInTheDocument();

    expect(screen.getByText("20/08/2025")).toBeInTheDocument();
    expect(screen.getByText("10:00")).toBeInTheDocument();
    expect(screen.getByText("João")).toBeInTheDocument();
    expect(screen.getByText("Dr. Ana")).toBeInTheDocument();
    expect(screen.getByText("Agendada")).toBeInTheDocument();
  });

  it("botão 'Voltar' chama navigate", async () => {
    (useAppointments as jest.Mock).mockReturnValue({ appointments: [] });

    render(<CalendarAppointments />);

    const button = screen.getByText("Voltar");
    await userEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/appointments");
  });

  it("exibe ID quando paciente ou médico não possui nome", () => {
    const appointmentsMock = [
      {
        id: 1,
        patientId: 5,
        patientName: "",
        doctorId: 10,
        doctorName: "",
        appointmentDate: "2025-08-18T14:30:00Z",
        status: AppointmentStatus.Scheduled,
      },
    ];
    (useAppointments as jest.Mock).mockReturnValue({ appointments: appointmentsMock });

    render(<CalendarAppointments />);

    expect(screen.getByText("ID 5")).toBeInTheDocument();
    expect(screen.getByText("ID 10")).toBeInTheDocument();
  });

  it("exibe 'Desconhecido' quando status não é válido", () => {
    // Tipo temporário para simular status inválido
    const invalidStatus: unknown = "invalid-status";

    const appointmentsMock = [
      {
        id: 1,
        patientId: 1,
        patientName: "Teste",
        doctorId: 2,
        doctorName: "Dr. Teste",
        appointmentDate: "2025-08-18T14:30:00Z",
        status: invalidStatus as AppointmentStatus,
      },
    ];
    (useAppointments as jest.Mock).mockReturnValue({ appointments: appointmentsMock });

    render(<CalendarAppointments />);

    expect(screen.getByText("Desconhecido")).toBeInTheDocument();
  });
});
