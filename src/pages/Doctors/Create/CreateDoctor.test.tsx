// src/pages/Doctors/Create/CreateDoctor.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { useDoctor } from "../../../hooks/useDoctor";
import CreateDoctor from "./CreateDoctor";

// Mock dos hooks e navegação
jest.mock("../../../hooks/useDoctor");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("CreateDoctor Component", () => {
  const navigateMock = jest.fn();
  const addDoctorMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (useDoctor as jest.Mock).mockReturnValue({
      doctors: [],
      addDoctor: addDoctorMock,
    });
  });

  it("renderiza todos os campos do formulário", () => {
    render(<CreateDoctor />);

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("CRM")).toBeInTheDocument();
    expect(screen.getByLabelText("Especialidade")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Telefone")).toBeInTheDocument();
    expect(screen.getByLabelText("Ativo")).toBeInTheDocument();

    expect(screen.getByText("Salvar")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("atualiza o estado ao preencher os inputs", () => {
    render(<CreateDoctor />);

    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "Dr. Teste" } });
    fireEvent.change(screen.getByLabelText("CRM"), { target: { value: "123456" } });
    fireEvent.change(screen.getByLabelText("Especialidade"), { target: { value: "Cardiologia" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "teste@email.com" } });
    fireEvent.change(screen.getByLabelText("Telefone"), { target: { value: "999999999" } });
    fireEvent.click(screen.getByLabelText("Ativo"));

    expect((screen.getByLabelText("Nome") as HTMLInputElement).value).toBe("Dr. Teste");
    expect((screen.getByLabelText("CRM") as HTMLInputElement).value).toBe("123456");
    expect((screen.getByLabelText("Especialidade") as HTMLInputElement).value).toBe("Cardiologia");
    expect((screen.getByLabelText("Email") as HTMLInputElement).value).toBe("teste@email.com");
    expect((screen.getByLabelText("Telefone") as HTMLInputElement).value).toBe("999999999");
    expect((screen.getByLabelText("Ativo") as HTMLInputElement).checked).toBe(true);
  });

  it("chama addDoctor e navigate ao enviar o formulário", () => {
    render(<CreateDoctor />);

    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "Dr. Teste" } });
    fireEvent.change(screen.getByLabelText("CRM"), { target: { value: "123456" } });
    fireEvent.change(screen.getByLabelText("Especialidade"), { target: { value: "Cardiologia" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "teste@email.com" } });
    fireEvent.change(screen.getByLabelText("Telefone"), { target: { value: "999999999" } });
    fireEvent.click(screen.getByLabelText("Ativo"));

    fireEvent.click(screen.getByText("Salvar"));

    expect(addDoctorMock).toHaveBeenCalledWith(expect.objectContaining({
      id: 1, // primeiro médico
      name: "Dr. Teste",
      crm: "123456",
      specialty: "Cardiologia",
      email: "teste@email.com",
      phone: "999999999",
      isActive: true
    }));

    expect(navigateMock).toHaveBeenCalledWith("/doctors");
  });

  it("botão cancelar chama navigate com /doctors", () => {
    render(<CreateDoctor />);
    fireEvent.click(screen.getByText("Cancelar"));
    expect(navigateMock).toHaveBeenCalledWith("/doctors");
  });
});
