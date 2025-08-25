// src/pages/Doctors/Delete/DeleteDoctor.test.tsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useNavigate, useParams } from "react-router-dom";
import { useDoctor } from "../../../hooks/useDoctor";
import DeleteDoctor from "./DeleteDoctor";

// Mock dos hooks e navegação
jest.mock("../../../hooks/useDoctor");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

describe("DeleteDoctor Component", () => {
  const navigateMock = jest.fn();
  const removeDoctorMock = jest.fn();
  const doctorExample = {
    id: 1,
    name: "Dr. Teste",
    crm: "123456",
    specialty: "Cardiologia",
    email: "teste@email.com",
    phone: "999999999",
    isActive: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (useDoctor as jest.Mock).mockReturnValue({
      doctors: [doctorExample],
      removeDoctor: removeDoctorMock,
    });
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
  });

  it("mostra 'Carregando...' se o médico ainda não foi encontrado", () => {
    (useDoctor as jest.Mock).mockReturnValue({ doctors: [], removeDoctor: removeDoctorMock });
    render(<DeleteDoctor />);
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("renderiza os detalhes do médico corretamente", async () => {
    render(<DeleteDoctor />);
    await waitFor(() => {
      expect(screen.getByText("Excluir Médico")).toBeInTheDocument();
      expect(screen.getByText("Dr. Teste")).toBeInTheDocument();
      expect(screen.getByText("123456")).toBeInTheDocument();
      expect(screen.getByText("Cardiologia")).toBeInTheDocument();
      expect(screen.getByText("teste@email.com")).toBeInTheDocument();
      expect(screen.getByText("999999999")).toBeInTheDocument();
      expect(screen.getByText("Sim")).toBeInTheDocument();
    });
  });

  it("chama removeDoctor e navigate ao clicar em 'Excluir'", async () => {
    render(<DeleteDoctor />);
    await waitFor(() => fireEvent.click(screen.getByText("Excluir")));

    expect(removeDoctorMock).toHaveBeenCalledWith(1);
    expect(navigateMock).toHaveBeenCalledWith("/doctors");
  });

  it("botão 'Cancelar' chama navigate com /doctors", async () => {
    render(<DeleteDoctor />);
    await waitFor(() => fireEvent.click(screen.getByText("Cancelar")));

    expect(navigateMock).toHaveBeenCalledWith("/doctors");
  });
});
