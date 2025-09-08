// src/pages/Patient/Delete/DeletePatient.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate, useParams } from "react-router-dom";
import { usePatient } from "../../../hooks/usePatient";
import DeletePatient from "./DeletePatient";

jest.mock("../../../hooks/usePatient");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

describe("DeletePatient Component", () => {
  const navigateMock = jest.fn();
  const deletePatientMock = jest.fn();
  const patientExample = {
    id: 1,
    name: "João Teste",
    cpf: "12345678900",
    dateOfBirth: "1990-01-01",
    email: "teste@email.com",
    phone: "999999999",
    address: "Rua A",
    gender: "Masculino",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (usePatient as jest.Mock).mockReturnValue({
      patients: [patientExample],
      deletePatient: deletePatientMock,
    });
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
  });

  it("mostra 'Carregando...' enquanto carrega o paciente", () => {
    (usePatient as jest.Mock).mockReturnValue({ patients: [], deletePatient: deletePatientMock });
    (useParams as jest.Mock).mockReturnValue({ id: "999" }); // id inexistente
    render(<DeletePatient />);
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("mostra 'Paciente não encontrado.' se não houver paciente com o id", () => {
    (usePatient as jest.Mock).mockReturnValue({ patients: [], deletePatient: deletePatientMock });
    (useParams as jest.Mock).mockReturnValue({ id: "999" });
    render(<DeletePatient />);
    expect(screen.getByText("Paciente não encontrado.")).toBeInTheDocument();
  });

  it("renderiza o paciente corretamente", async () => {
    render(<DeletePatient />);
    expect(await screen.findByText("Confirmar Exclusão")).toBeInTheDocument();
    expect(screen.getByText(/João Teste/)).toBeInTheDocument();
    expect(screen.getByText("Excluir")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("chama deletePatient e navega ao clicar em 'Excluir'", async () => {
    render(<DeletePatient />);
    fireEvent.click(screen.getByText("Excluir"));
    expect(deletePatientMock).toHaveBeenCalledWith(1);
    expect(navigateMock).toHaveBeenCalledWith("/patient");
  });

  it("botão 'Cancelar' chama navigate com /patient", async () => {
    render(<DeletePatient />);
    fireEvent.click(screen.getByText("Cancelar"));
    expect(navigateMock).toHaveBeenCalledWith("/patient");
  });
});
