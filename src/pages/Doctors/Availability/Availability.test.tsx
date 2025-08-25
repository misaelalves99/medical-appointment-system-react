// src/pages/Doctor/Availability/Availability.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { useDoctor } from "../../../hooks/useDoctor";
import Availability from "./Availability";

// Mock dos hooks e navegação
jest.mock("../../../hooks/useDoctor");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Availability Component", () => {
  const navigateMock = jest.fn();

  const doctorsMock = [
    { id: 1, name: "Dr. Ana" },
    { id: 2, name: "Dr. João" },
  ];

  const availabilitiesMock = [
    { doctorId: 2, date: "2025-08-22", startTime: "09:00", endTime: "10:00", isAvailable: true },
    { doctorId: 1, date: "2025-08-21", startTime: "14:00", endTime: "15:00", isAvailable: false },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useDoctor as jest.Mock).mockReturnValue({ doctors: doctorsMock });
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  it("renderiza a tabela com disponibilidades e nomes dos médicos", () => {
    render(<Availability availabilities={availabilitiesMock} />);

    expect(screen.getByText("Disponibilidade dos Médicos")).toBeInTheDocument();

    // Verifica se os médicos aparecem corretos e ordenados por data/hora
    const rows = screen.getAllByRole("row");
    // header + 2 rows
    expect(rows).toHaveLength(3);

    expect(screen.getByText("Dr. Ana")).toBeInTheDocument();
    expect(screen.getByText("22/08/2025")).toBeInTheDocument();
    expect(screen.getByText("09:00")).toBeInTheDocument();
    expect(screen.getByText("Sim")).toBeInTheDocument();

    expect(screen.getByText("Dr. João")).toBeInTheDocument();
    expect(screen.getByText("21/08/2025")).toBeInTheDocument();
    expect(screen.getByText("14:00")).toBeInTheDocument();
    expect(screen.getByText("Não")).toBeInTheDocument();
  });

  it("mostra ID do médico se não encontrado no hook", () => {
    const unknownAvailabilities = [{ doctorId: 999, date: "2025-08-23", startTime: "08:00", endTime: "09:00", isAvailable: true }];
    render(<Availability availabilities={unknownAvailabilities} />);
    expect(screen.getByText("ID 999")).toBeInTheDocument();
  });

  it("botão Voltar chama navigate com a rota correta", () => {
    render(<Availability availabilities={availabilitiesMock} />);
    fireEvent.click(screen.getByText("Voltar"));
    expect(navigateMock).toHaveBeenCalledWith("/doctors");
  });
});
