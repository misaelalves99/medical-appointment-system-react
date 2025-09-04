// src/contexts/PatientContext.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { useContext } from "react";
import { PatientContext } from "./PatientContext";
import { PatientProvider } from "./PatientProvider";
import type { PatientContextType } from "../types/Patient";

const TestComponent = () => {
  const { patients, addPatient, updatePatient, deletePatient, updatePatientProfilePicture } =
    useContext(PatientContext) as PatientContextType;

  return (
    <div>
      <span data-testid="patients-count">{patients.length}</span>

      <button
        onClick={() =>
          addPatient({
            name: "Paciente Teste",
            cpf: "12345678900",
            dateOfBirth: "2000-01-01",
            email: "teste@example.com",
            phone: "11999999999",
            address: "Rua A, 123",
            gender: "M",
            profilePicturePath: "/default.png",
          })
        }
      >
        Add
      </button>

      <button
        onClick={() =>
          updatePatient({
            id: 1,
            name: "Paciente Atualizado",
            cpf: "12345678900",
            dateOfBirth: "1999-12-31",
            email: "update@example.com",
            phone: "11988888888",
            address: "Rua B, 456",
            gender: "F",
            profilePicturePath: "/updated.png",
          })
        }
      >
        Update
      </button>

      <button onClick={() => deletePatient(1)}>Delete</button>
      <button onClick={() => updatePatientProfilePicture(1, "/new-pic.png")}>
        Update Picture
      </button>
    </div>
  );
};

describe("PatientContext", () => {
  it("inicializa com valores padrão e funções disponíveis", () => {
    render(
      <PatientProvider>
        <TestComponent />
      </PatientProvider>
    );

    const count = screen.getByTestId("patients-count");
    expect(count.textContent).toBe("0");

    expect(screen.getByText("Add")).toBeInTheDocument();
    expect(screen.getByText("Update")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByText("Update Picture")).toBeInTheDocument();
  });

  it("adiciona, atualiza, altera foto e deleta paciente", () => {
    render(
      <PatientProvider>
        <TestComponent />
      </PatientProvider>
    );

    const count = () => screen.getByTestId("patients-count");

    // Adicionar paciente
    fireEvent.click(screen.getByText("Add"));
    expect(count().textContent).toBe("1");

    // Atualizar paciente
    fireEvent.click(screen.getByText("Update"));
    expect(count().textContent).toBe("1");

    // Alterar foto
    fireEvent.click(screen.getByText("Update Picture"));
    expect(count().textContent).toBe("1");

    // Deletar paciente
    fireEvent.click(screen.getByText("Delete"));
    expect(count().textContent).toBe("0");
  });
});
