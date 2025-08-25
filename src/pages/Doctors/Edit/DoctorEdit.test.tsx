// src/pages/Doctors/Edit/DoctorEdit.test.tsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useNavigate, useParams } from "react-router-dom";
import { useDoctor } from "../../../hooks/useDoctor";
import DoctorEdit from "./DoctorEdit";

jest.mock("../../../hooks/useDoctor");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

describe("DoctorEdit Component", () => {
  const navigateMock = jest.fn();
  const updateDoctorMock = jest.fn();
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
      updateDoctor: updateDoctorMock,
    });
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
  });

  it("exibe 'Carregando...' se o médico não foi encontrado", () => {
    (useDoctor as jest.Mock).mockReturnValue({ doctors: [], updateDoctor: updateDoctorMock });
    render(<DoctorEdit />);
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("renderiza corretamente o formulário com dados do médico", async () => {
    render(<DoctorEdit />);
    await waitFor(() => {
      expect(screen.getByDisplayValue(doctorExample.name)).toBeInTheDocument();
      expect(screen.getByDisplayValue(doctorExample.crm)).toBeInTheDocument();
      expect(screen.getByDisplayValue(doctorExample.specialty)).toBeInTheDocument();
      expect(screen.getByDisplayValue(doctorExample.email)).toBeInTheDocument();
      expect(screen.getByDisplayValue(doctorExample.phone)).toBeInTheDocument();
      expect(screen.getByRole("checkbox")).toBeChecked();
    });
  });

  it("atualiza os valores do formulário ao digitar nos inputs", async () => {
    render(<DoctorEdit />);
    const nameInput = await screen.findByDisplayValue(doctorExample.name);
    fireEvent.change(nameInput, { target: { value: "Dr. Alterado" } });
    expect(nameInput).toHaveValue("Dr. Alterado");

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });

  it("chama updateDoctor e navigate ao enviar o formulário", async () => {
    render(<DoctorEdit />);
    fireEvent.click(screen.getByText("Salvar Alterações"));

    await waitFor(() => {
      expect(updateDoctorMock).toHaveBeenCalledWith(doctorExample);
      expect(navigateMock).toHaveBeenCalledWith("/doctors");
    });
  });

  it("botão Cancelar chama navigate com /doctors", async () => {
    render(<DoctorEdit />);
    fireEvent.click(screen.getByText("Cancelar"));
    expect(navigateMock).toHaveBeenCalledWith("/doctors");
  });
});
