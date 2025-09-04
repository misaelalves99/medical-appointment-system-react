// src/pages/Doctors/Create/CreateDoctor.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { useDoctor } from "../../../hooks/useDoctor";
import { useSpecialty } from "../../../hooks/useSpecialty";
import CreateDoctor from "./CreateDoctor";

// Mock dos hooks e navegação
jest.mock("../../../hooks/useDoctor");
jest.mock("../../../hooks/useSpecialty");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("CreateDoctor Component", () => {
  const navigateMock = jest.fn();
  const addDoctorMock = jest.fn();
  const specialtiesMock = [
    { id: 1, name: "Cardiologia" },
    { id: 2, name: "Dermatologia" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (useDoctor as jest.Mock).mockReturnValue({
      doctors: [],
      addDoctor: addDoctorMock,
    });
    (useSpecialty as jest.Mock).mockReturnValue({
      specialties: specialtiesMock,
    });
  });

  it("renderiza todos os campos do formulário e opções de especialidade", () => {
    render(<CreateDoctor />);

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("CRM")).toBeInTheDocument();
    expect(screen.getByLabelText("Especialidade")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Telefone")).toBeInTheDocument();
    expect(screen.getByLabelText("Ativo")).toBeInTheDocument();

    // Verifica opções de especialidade
    expect(screen.getByText("Cardiologia")).toBeInTheDocument();
    expect(screen.getByText("Dermatologia")).toBeInTheDocument();

    expect(screen.getByText("Salvar")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("atualiza o estado do formulário ao preencher os inputs", () => {
    render(<CreateDoctor />);

    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "Dr. Teste" } });
    fireEvent.change(screen.getByLabelText("CRM"), { target: { value: "123456" } });
    fireEvent.change(screen.getByLabelText("Especialidade"), { target: { value: "Cardiologia" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "teste@email.com" } });
    fireEvent.change(screen.getByLabelText("Telefone"), { target: { value: "999999999" } });
    fireEvent.click(screen.getByLabelText("Ativo"));

    expect((screen.getByLabelText("Nome") as HTMLInputElement).value).toBe("Dr. Teste");
    expect((screen.getByLabelText("CRM") as HTMLInputElement).value).toBe("123456");
    expect((screen.getByLabelText("Especialidade") as HTMLSelectElement).value).toBe("Cardiologia");
    expect((screen.getByLabelText("Email") as HTMLInputElement).value).toBe("teste@email.com");
    expect((screen.getByLabelText("Telefone") as HTMLInputElement).value).toBe("999999999");
    expect((screen.getByLabelText("Ativo") as HTMLInputElement).checked).toBe(true);
  });

  it("chama addDoctor e navega ao enviar o formulário", () => {
    render(<CreateDoctor />);

    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "Dr. Teste" } });
    fireEvent.change(screen.getByLabelText("CRM"), { target: { value: "123456" } });
    fireEvent.change(screen.getByLabelText("Especialidade"), { target: { value: "Cardiologia" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "teste@email.com" } });
    fireEvent.change(screen.getByLabelText("Telefone"), { target: { value: "999999999" } });
    fireEvent.click(screen.getByLabelText("Ativo"));

    fireEvent.click(screen.getByText("Salvar"));

    expect(addDoctorMock).toHaveBeenCalledWith(expect.objectContaining({
      id: 1,
      name: "Dr. Teste",
      crm: "123456",
      specialty: "Cardiologia",
      email: "teste@email.com",
      phone: "999999999",
      isActive: true
    }));

    expect(navigateMock).toHaveBeenCalledWith("/doctors");
  });

  it("botão Cancelar navega para /doctors sem adicionar médico", () => {
    render(<CreateDoctor />);
    fireEvent.click(screen.getByText("Cancelar"));
    expect(navigateMock).toHaveBeenCalledWith("/doctors");
    expect(addDoctorMock).not.toHaveBeenCalled();
  });
});
