// src/contexts/SpecialtyProvider.test.tsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import { SpecialtyProvider } from "./SpecialtyProvider";
import { SpecialtyContext } from "./SpecialtyContext";
import { specialtiesMock } from "../mocks/specialties";

describe("SpecialtyProvider", () => {
  const TestComponent = () => {
    const { specialties, addSpecialty, updateSpecialty, removeSpecialty } =
      useContext(SpecialtyContext)!;

    return (
      <div>
        <ul>
          {specialties.map((s) => (
            <li key={s.id}>{s.name}</li>
          ))}
        </ul>
        <button onClick={() => addSpecialty("Cardiologia")}>Add</button>
        <button onClick={() => updateSpecialty(1, "Neurologia")}>Update</button>
        <button onClick={() => removeSpecialty(1)}>Remove</button>
        <button onClick={() => updateSpecialty(999, "Inexistente")}>
          UpdateInvalid
        </button>
        <button onClick={() => removeSpecialty(999)}>RemoveInvalid</button>
      </div>
    );
  };

  it("deve iniciar com specialtiesMock", () => {
    render(
      <SpecialtyProvider>
        <TestComponent />
      </SpecialtyProvider>
    );

    specialtiesMock.forEach((s) => {
      expect(screen.getByText(s.name)).toBeInTheDocument();
    });
  });

  it("deve adicionar uma especialidade", async () => {
    render(
      <SpecialtyProvider>
        <TestComponent />
      </SpecialtyProvider>
    );

    await userEvent.click(screen.getByText("Add"));
    expect(screen.getByText("Cardiologia")).toBeInTheDocument();
  });

  it("deve atualizar uma especialidade existente", async () => {
    render(
      <SpecialtyProvider>
        <TestComponent />
      </SpecialtyProvider>
    );

    await userEvent.click(screen.getByText("Update"));
    expect(screen.getByText("Neurologia")).toBeInTheDocument();
  });

  it("não deve atualizar se o id não existir", async () => {
    render(
      <SpecialtyProvider>
        <TestComponent />
      </SpecialtyProvider>
    );

    await userEvent.click(screen.getByText("UpdateInvalid"));
    specialtiesMock.forEach((s) => {
      expect(screen.getByText(s.name)).toBeInTheDocument();
    });
  });

  it("deve remover uma especialidade existente", async () => {
    render(
      <SpecialtyProvider>
        <TestComponent />
      </SpecialtyProvider>
    );

    const firstName = specialtiesMock[0].name;
    expect(screen.getByText(firstName)).toBeInTheDocument();

    await userEvent.click(screen.getByText("Remove"));
    expect(screen.queryByText(firstName)).not.toBeInTheDocument();
  });

  it("não deve remover se o id não existir", async () => {
    render(
      <SpecialtyProvider>
        <TestComponent />
      </SpecialtyProvider>
    );

    await userEvent.click(screen.getByText("RemoveInvalid"));
    specialtiesMock.forEach((s) => {
      expect(screen.getByText(s.name)).toBeInTheDocument();
    });
  });
});
