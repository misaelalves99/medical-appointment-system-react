import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import { PatientProvider } from "./PatientProvider";
import { PatientContext, PatientContextType } from "./PatientContext";

describe("PatientProvider", () => {
  it("renderiza pacientes do mock e manipula pacientes corretamente", async () => {
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

      const patientId = patients.find(p => p.name === newPatient.name)?.id ?? 0;

      return (
        <div>
          <ul>
            {patients.map(p => <li key={p.id} data-testid={`patient-${p.id}`}>{p.name}</li>)}
          </ul>

          <button onClick={() => addPatient(newPatient)}>Add</button>
          {patientId !== 0 && (
            <>
              <button onClick={() => updatePatient({ ...patients.find(p => p.id === patientId)!, name: "Paciente Atualizado" })}>Update</button>
              <button onClick={() => deletePatient(patientId)}>Delete</button>
              <button onClick={() => updatePatientProfilePicture(patientId, "/foto.jpg")}>Update Photo</button>
            </>
          )}
        </div>
      );
    };

    render(
      <PatientProvider>
        <TestComponent />
      </PatientProvider>
    );

    const user = userEvent.setup();

    await user.click(screen.getByText("Add"));
    expect(screen.getByText("Novo Paciente")).toBeInTheDocument();

    await user.click(screen.getByText("Update"));
    expect(screen.getByText("Paciente Atualizado")).toBeInTheDocument();

    await user.click(screen.getByText("Delete"));
    expect(screen.queryByText("Paciente Atualizado")).not.toBeInTheDocument();
  });

  it("atualiza corretamente o path da foto", async () => {
    let context: PatientContextType | undefined;
    const Consumer = () => {
      context = useContext(PatientContext);
      return null;
    };

    render(
      <PatientProvider>
        <Consumer />
      </PatientProvider>
    );

    // Adiciona paciente
    const added = context!.addPatient({
      name: "Paciente Foto",
      cpf: "987.654.321-00",
      dateOfBirth: "2000-01-01",
      email: "",
      phone: "",
      address: "",
    });

    // Atualiza foto
    context!.updatePatientProfilePicture(added.id, "/foto.jpg");

    const updated = context!.patients.find(p => p.id === added.id);
    expect(updated?.profilePicturePath).toBe("/foto.jpg");
  });
});
