// src/contexts/PatientProvider.test.tsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import { PatientProvider } from "./PatientProvider";
import { PatientContext, PatientContextType } from "./PatientContext";
import type { Patient } from "../types/Patient";

const TestComponent = () => {
  const { patients, addPatient, updatePatient, deletePatient, updatePatientProfilePicture } =
    useContext(PatientContext)!;

  const newPatient = {
    name: "Novo Paciente",
    cpf: "123.456.789-00",
    dateOfBirth: "2000-01-01",
    email: "",
    phone: "",
    address: "",
  };

  const patientId = patients.find((p) => p.name === newPatient.name)?.id ?? 0;

  return (
    <div>
      <ul>
        {patients.map((p) => (
          <li key={p.id} data-testid={`patient-${p.id}`}>
            {p.name}
          </li>
        ))}
      </ul>

      <button onClick={() => addPatient(newPatient)}>Add</button>

      {patientId !== 0 && (
        <>
          <button
            onClick={() =>
              updatePatient({ ...patients.find((p) => p.id === patientId)!, name: "Paciente Atualizado" })
            }
          >
            Update
          </button>

          <button onClick={() => deletePatient(patientId)}>Delete</button>

          <button onClick={() => updatePatientProfilePicture(patientId, "/path/to/photo.jpg")}>
            Update Photo
          </button>
        </>
      )}
    </div>
  );
};

describe("PatientProvider", () => {
  it("renderiza pacientes iniciais do mock", () => {
    render(
      <PatientProvider>
        <TestComponent />
      </PatientProvider>
    );

    const items = screen.getAllByRole("listitem");
    expect(items.length).toBeGreaterThan(0);
  });

  it("adiciona um paciente corretamente", async () => {
    render(
      <PatientProvider>
        <TestComponent />
      </PatientProvider>
    );

    expect(screen.queryByText("Novo Paciente")).not.toBeInTheDocument();
    await userEvent.click(screen.getByText("Add"));
    expect(screen.getByText("Novo Paciente")).toBeInTheDocument();
  });

  it("atualiza um paciente corretamente", async () => {
    render(
      <PatientProvider>
        <TestComponent />
      </PatientProvider>
    );

    await userEvent.click(screen.getByText("Add"));
    await userEvent.click(screen.getByText("Update"));
    expect(screen.getByText("Paciente Atualizado")).toBeInTheDocument();
  });

  it("deleta um paciente corretamente", async () => {
    render(
      <PatientProvider>
        <TestComponent />
      </PatientProvider>
    );

    await userEvent.click(screen.getByText("Add"));
    expect(screen.getByText("Novo Paciente")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Delete"));
    expect(screen.queryByText("Novo Paciente")).not.toBeInTheDocument();
  });

  it("atualiza o path da foto do paciente corretamente", async () => {
    let patientContext!: PatientContextType;

    const ContextConsumer = () => {
      patientContext = useContext(PatientContext)!;
      return null;
    };

    render(
      <PatientProvider>
        <ContextConsumer />
      </PatientProvider>
    );

    // Adiciona paciente via contexto
    patientContext.addPatient({
      name: "Paciente Foto",
      cpf: "987.654.321-00",
      dateOfBirth: "2000-01-01",
      email: "",
      phone: "",
      address: "",
    });

    const addedPatient = patientContext.patients.find((p) => p.name === "Paciente Foto")!;
    patientContext.updatePatientProfilePicture(addedPatient.id, "/foto.jpg");

    const updated = patientContext.patients.find((p: Patient) => p.id === addedPatient.id);
    expect(updated?.profilePicturePath).toBe("/foto.jpg");
  });
});
