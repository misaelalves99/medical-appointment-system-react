// src/pages/Doctors/Details/DoctorDetails.test.tsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useNavigate, useParams } from "react-router-dom";
import { useDoctor } from "../../../hooks/useDoctor";
import DoctorDetails from "./DoctorDetails";

jest.mock("../../../hooks/useDoctor");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

describe("DoctorDetails Component", () => {
  const navigateMock = jest.fn();
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
    (useDoctor as jest.Mock).mockReturnValue({ doctors: [doctorExample] });
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
  });

  it("exibe 'Carregando...' se o médico não foi encontrado", () => {
    (useDoctor as jest.Mock).mockReturnValue({ doctors: [] });
    render(<DoctorDetails />);
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("renderiza corretamente os detalhes do médico", async () => {
    render(<DoctorDetails />);
    await waitFor(() => {
      expect(screen.getByText("Detalhes do Médico")).toBeInTheDocument();
      expect(screen.getByText(/Nome:/)).toHaveTextContent(`Nome: ${doctorExample.name}`);
      expect(screen.getByText(/CRM:/)).toHaveTextContent(`CRM: ${doctorExample.crm}`);
      expect(screen.getByText(/Especialidade:/)).toHaveTextContent(`Especialidade: ${doctorExample.specialty}`);
      expect(screen.getByText(/Email:/)).toHaveTextContent(`Email: ${doctorExample.email}`);
      expect(screen.getByText(/Telefone:/)).toHaveTextContent(`Telefone: ${doctorExample.phone}`);
      expect(screen.getByText(/Ativo:/)).toHaveTextContent("Ativo: Sim");
    });
  });

  it("botão 'Editar' chama navigate com o path correto", async () => {
    render(<DoctorDetails />);
    await waitFor(() => fireEvent.click(screen.getByText("Editar")));
    expect(navigateMock).toHaveBeenCalledWith(`/doctors/edit/${doctorExample.id}`);
  });

  it("botão 'Voltar' chama navigate com /doctors", async () => {
    render(<DoctorDetails />);
    await waitFor(() => fireEvent.click(screen.getByText("Voltar")));
    expect(navigateMock).toHaveBeenCalledWith("/doctors");
  });
});
