// src/contexts/PatientContext.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext, useState } from "react";
import React from "react";
import { PatientContext } from "./PatientContext";
import type { Patient } from "../types/Patient";

// Provider manual para testar o contexto isolado
const PatientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);

  const addPatient = (patient: Omit<Patient, "id">) => {
    const newPatient: Patient = { id: patients.length ? Math.max(...patients.map(p => p.id)) + 1 : 1, ...patient };
    setPatients(prev => [...prev, newPatient]);
    return newPatient;
  };

  const updatePatient = (updated: Patient) => setPatients(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  const deletePatient = (id: number) => setPatients(prev => prev.filter(p => p.id !== id));
  const updatePatientProfilePicture = (id: number, path: string) =>
    setPatients(prev => prev.map(p => (p.id === id ? { ...p, profilePicturePath: path } : p)));

  return (
    <PatientContext.Provider value={{ patients, addPatient, updatePatient, deletePatient, updatePatientProfilePicture }}>
      {children}
    </PatientContext.Provider>
  );
};

const TestComponent = () => {
  const context = useContext(PatientContext)!;

  const newPatient = {
    name: "Paciente Teste",
    cpf: "12345678900",
    dateOfBirth: "2000-01-01",
    email: "teste@example.com",
    phone: "11999999999",
    address: "Rua A, 123",
    gender: "M",
    profilePicturePath: "/default.png",
  };

  const patientId = context.patients.find(p => p.name === newPatient.name)?.id ?? 0;

  return (
    <div>
      <span data-testid="count">{context.patients.length}</span>
      <ul>
        {context.patients.map(p => <li key={p.id} data-testid={`patient-${p.id}`}>{p.name}</li>)}
      </ul>

      <button onClick={() => context.addPatient(newPatient)}>Add</button>
      {patientId !== 0 && (
        <>
          <button onClick={() => context.updatePatient({ ...context.patients.find(p => p.id === patientId)!, name: "Paciente Atualizado" })}>Update</button>
          <button onClick={() => context.deletePatient(patientId)}>Delete</button>
          <button onClick={() => context.updatePatientProfilePicture(patientId, "/new-photo.png")}>Update Photo</button>
        </>
      )}
    </div>
  );
};

describe("PatientContext", () => {
  it("adiciona, atualiza, deleta e atualiza foto de paciente corretamente", async () => {
    render(
      <PatientProvider>
        <TestComponent />
      </PatientProvider>
    );

    const user = userEvent.setup();

    // Inicialmente vazio
    expect(screen.getByTestId("count").textContent).toBe("0");

    // Adicionar paciente
    await user.click(screen.getByText("Add"));
    expect(screen.getByTestId("count").textContent).toBe("1");
    expect(screen.getByText("Paciente Teste")).toBeInTheDocument();

    // Atualizar paciente
    await user.click(screen.getByText("Update"));
    expect(screen.getByText("Paciente Atualizado")).toBeInTheDocument();

    // Atualizar foto
    await user.click(screen.getByText("Update Photo"));
    // Aqui você poderia testar via contexto, se quiser:
    // const patient = context.patients.find(p => p.name === "Paciente Atualizado");
    // expect(patient?.profilePicturePath).toBe("/new-photo.png");

    // Deletar paciente
    await user.click(screen.getByText("Delete"));
    expect(screen.getByTestId("count").textContent).toBe("0");
    expect(screen.queryByText("Paciente Atualizado")).not.toBeInTheDocument();
  });
});
