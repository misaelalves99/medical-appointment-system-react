// src/contexts/SpecialtyContext.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useContext, useState, ReactNode } from "react";
import { SpecialtyContext, SpecialtyContextType } from "./SpecialtyContext";
import type { Specialty } from "../types/Specialty";

describe("SpecialtyContext (isolado)", () => {
  const TestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [specialties, setSpecialties] = useState<Specialty[]>([]);

    const addSpecialty = (name: string) => {
      const newId = specialties.length ? Math.max(...specialties.map(s => s.id)) + 1 : 1;
      setSpecialties([...specialties, { id: newId, name }]);
    };

    const updateSpecialty = (id: number, name: string) => {
      setSpecialties(specialties.map(s => (s.id === id ? { ...s, name } : s)));
    };

    const removeSpecialty = (id: number) => {
      setSpecialties(specialties.filter(s => s.id !== id));
    };

    const contextValue: SpecialtyContextType = { specialties, addSpecialty, updateSpecialty, removeSpecialty };

    return <SpecialtyContext.Provider value={contextValue}>{children}</SpecialtyContext.Provider>;
  };

  const TestComponent = () => {
    const { specialties, addSpecialty, updateSpecialty, removeSpecialty } = useContext<SpecialtyContextType>(SpecialtyContext)!;

    return (
      <div>
        <ul>
          {specialties.map(s => <li key={s.id}>{s.name}</li>)}
        </ul>
        <button onClick={() => addSpecialty("Cardiologia")}>Add</button>
        <button onClick={() => updateSpecialty(1, "Neurologia")}>Update</button>
        <button onClick={() => removeSpecialty(1)}>Remove</button>
        <button onClick={() => updateSpecialty(99, "Inexistente")}>UpdateInvalid</button>
        <button onClick={() => removeSpecialty(99)}>RemoveInvalid</button>
      </div>
    );
  };

  it("inicia com lista vazia", () => {
    render(
      <TestProvider>
        <TestComponent />
      </TestProvider>
    );
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("adiciona uma especialidade", async () => {
    render(
      <TestProvider>
        <TestComponent />
      </TestProvider>
    );

    await userEvent.click(screen.getByText("Add"));
    expect(screen.getByText("Cardiologia")).toBeInTheDocument();
  });

  it("atualiza uma especialidade existente", async () => {
    render(
      <TestProvider>
        <TestComponent />
      </TestProvider>
    );

    await userEvent.click(screen.getByText("Add"));
    await userEvent.click(screen.getByText("Update"));
    expect(screen.getByText("Neurologia")).toBeInTheDocument();
  });

  it("não atualiza se o id não existir", async () => {
    render(
      <TestProvider>
        <TestComponent />
      </TestProvider>
    );

    await userEvent.click(screen.getByText("Add"));
    await userEvent.click(screen.getByText("UpdateInvalid"));
    expect(screen.getByText("Cardiologia")).toBeInTheDocument();
  });

  it("remove uma especialidade existente", async () => {
    render(
      <TestProvider>
        <TestComponent />
      </TestProvider>
    );

    await userEvent.click(screen.getByText("Add"));
    await userEvent.click(screen.getByText("Remove"));
    expect(screen.queryByText("Cardiologia")).not.toBeInTheDocument();
  });

  it("não remove se o id não existir", async () => {
    render(
      <TestProvider>
        <TestComponent />
      </TestProvider>
    );

    await userEvent.click(screen.getByText("Add"));
    await userEvent.click(screen.getByText("RemoveInvalid"));
    expect(screen.getByText("Cardiologia")).toBeInTheDocument();
  });
});
