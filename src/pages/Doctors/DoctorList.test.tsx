// src/pages/Doctors/DoctorList.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { useDoctor } from "../../hooks/useDoctor";
import DoctorList from "./index";

jest.mock("../../hooks/useDoctor");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("DoctorList Component", () => {
  const navigateMock = jest.fn();

  const doctorsMock = [
    {
      id: 1,
      name: "Dr. Teste",
      crm: "12345",
      specialty: "Cardiologia",
      email: "teste@email.com",
      phone: "999999999",
      isActive: true,
    },
    {
      id: 2,
      name: "Dra. Exemplo",
      crm: "67890",
      specialty: "Pediatria",
      email: "exemplo@email.com",
      phone: "888888888",
      isActive: false,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (useDoctor as jest.Mock).mockReturnValue({ doctors: doctorsMock });
  });

  it("renderiza corretamente a lista de médicos", () => {
    render(<DoctorList />);
    expect(screen.getByText("Lista de Médicos")).toBeInTheDocument();
    expect(screen.getByText("Dr. Teste")).toBeInTheDocument();
    expect(screen.getByText("Dra. Exemplo")).toBeInTheDocument();
  });

  it("filtra médicos com base no input de pesquisa", () => {
    render(<DoctorList />);
    const input = screen.getByPlaceholderText("Pesquisar médicos...");
    fireEvent.change(input, { target: { value: "Cardiologia" } });
    expect(screen.getByText("Dr. Teste")).toBeInTheDocument();
    expect(screen.queryByText("Dra. Exemplo")).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: "NãoExiste" } });
    expect(screen.getByText("Nenhum médico encontrado.")).toBeInTheDocument();
  });

  it("botão Cadastrar Novo Médico chama navigate com /doctors/create", () => {
    render(<DoctorList />);
    fireEvent.click(screen.getByText("Cadastrar Novo Médico"));
    expect(navigateMock).toHaveBeenCalledWith("/doctors/create");
  });

  it("botões de Detalhes, Editar e Excluir chamam navigate com os links corretos", () => {
    render(<DoctorList />);
    fireEvent.click(screen.getAllByText("Detalhes")[0]);
    expect(navigateMock).toHaveBeenCalledWith("/doctors/details/1");

    fireEvent.click(screen.getAllByText("Editar")[0]);
    expect(navigateMock).toHaveBeenCalledWith("/doctors/edit/1");

    fireEvent.click(screen.getAllByText("Excluir")[0]);
    expect(navigateMock).toHaveBeenCalledWith("/doctors/delete/1");
  });
});
