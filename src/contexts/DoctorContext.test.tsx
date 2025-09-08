// src/contexts/DoctorContext.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext, useState } from "react";
import { DoctorContext, DoctorContextType } from "./DoctorContext";
import type { Doctor } from "../types/Doctor";
import React from "react";

// 🔹 Provider manual para testar o contexto isolado
const DoctorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const addDoctor = (doctor: Doctor) => setDoctors(prev => [...prev, doctor]);
  const updateDoctor = (doctor: Doctor) => setDoctors(prev => prev.map(d => d.id === doctor.id ? doctor : d));
  const removeDoctor = (id: number) => setDoctors(prev => prev.filter(d => d.id !== id));

  return (
    <DoctorContext.Provider value={{ doctors, addDoctor, updateDoctor, removeDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
};

const TestComponent = () => {
  const { doctors, addDoctor, updateDoctor, removeDoctor } = useContext<DoctorContextType>(DoctorContext);

  return (
    <div>
      <span data-testid="count">{doctors.length}</span>
      {doctors[0] && (
        <>
          <span data-testid="name">{doctors[0].name}</span>
          <span data-testid="email">{doctors[0].email}</span>
        </>
      )}
      <button onClick={() => addDoctor({
        id: 1, name: "Dr. Alice", fullName: "Dra. Alice Silva", crm: "12345",
        specialty: "Cardiology", email: "alice@example.com", phone: "11999999999", isActive: true
      })}>Add</button>
      <button onClick={() => updateDoctor({
        id: 1, name: "Dr. Bob", fullName: "Dr. Bob Souza", crm: "12345",
        specialty: "Cardiology", email: "bob@example.com", phone: "11999999999", isActive: true
      })}>Update</button>
      <button onClick={() => removeDoctor(1)}>Remove</button>
    </div>
  );
};

describe("DoctorContext", () => {
  it("adiciona, atualiza e remove médico corretamente", async () => {
    render(
      <DoctorProvider>
        <TestComponent />
      </DoctorProvider>
    );

    const user = userEvent.setup();
    const count = screen.getByTestId("count");

    expect(count.textContent).toBe("0");

    await user.click(screen.getByText("Add"));
    expect(count.textContent).toBe("1");
    expect(screen.getByTestId("name").textContent).toBe("Dr. Alice");

    await user.click(screen.getByText("Update"));
    expect(screen.getByTestId("name").textContent).toBe("Dr. Bob");

    await user.click(screen.getByText("Remove"));
    expect(count.textContent).toBe("0");
  });

  it("não quebra ao atualizar/remover médico inexistente", async () => {
    render(
      <DoctorProvider>
        <TestComponent />
      </DoctorProvider>
    );
    const user = userEvent.setup();

    // Tenta atualizar/remover sem adicionar
    await user.click(screen.getByText("Update"));
    await user.click(screen.getByText("Remove"));

    expect(screen.getByTestId("count").textContent).toBe("0");
  });
});
