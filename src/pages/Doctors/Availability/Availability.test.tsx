// src/pages/Doctor/Availability/Availability.test.tsx

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

  it("renderiza corretamente a tabela com disponibilidades ordenadas por data/hora", () => {
    render(<Availability availabilities={availabilitiesMock} />);
    expect(screen.getByText("Disponibilidade dos Médicos")).toBeInTheDocument();

    const rows = screen.getAllByRole("row");
    // header + 2 linhas de dados
    expect(rows).toHaveLength(3);

    // Verifica os dados da primeira disponibilidade (ordenada)
    const firstRowCells = rows[1].querySelectorAll("td");
    expect(firstRowCells[0].textContent).toBe("Dr. Ana");
    expect(firstRowCells[1].textContent).toBe(new Date("2025-08-21").toLocaleDateString("pt-BR"));
    expect(firstRowCells[2].textContent).toBe("14:00");
    expect(firstRowCells[4].textContent).toBe("Não");

    // Verifica a segunda linha
    const secondRowCells = rows[2].querySelectorAll("td");
    expect(secondRowCells[0].textContent).toBe("Dr. João");
    expect(secondRowCells[1].textContent).toBe(new Date("2025-08-22").toLocaleDateString("pt-BR"));
    expect(secondRowCells[2].textContent).toBe("09:00");
    expect(secondRowCells[4].textContent).toBe("Sim");
  });

  it("mostra ID do médico se não encontrado no hook", () => {
    const unknownAvailabilities = [
      { doctorId: 999, date: "2025-08-23", startTime: "08:00", endTime: "09:00", isAvailable: true }
    ];
    render(<Availability availabilities={unknownAvailabilities} />);
    expect(screen.getByText("ID 999")).toBeInTheDocument();
  });

  it("botão Voltar chama navigate com a rota correta", () => {
    render(<Availability availabilities={availabilitiesMock} />);
    fireEvent.click(screen.getByText("Voltar"));
    expect(navigateMock).toHaveBeenCalledWith("/doctors");
  });

  it("exibe corretamente Disponível como 'Sim' ou 'Não'", () => {
    render(<Availability availabilities={availabilitiesMock} />);
    expect(screen.getByText("Sim")).toBeInTheDocument();
    expect(screen.getByText("Não")).toBeInTheDocument();
  });
});
