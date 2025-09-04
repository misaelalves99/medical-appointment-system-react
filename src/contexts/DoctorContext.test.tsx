// src/contexts/DoctorContext.test.tsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import { DoctorContext, DoctorContextType } from "./DoctorContext";

// 🔹 Criamos um Provider manual para testar o contexto de verdade
import React, { useState } from "react";
import type { Doctor } from "../types/Doctor";

const DoctorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const addDoctor = (doctor: Doctor) => {
    setDoctors((prev) => [...prev, doctor]);
  };

  const updateDoctor = (doctor: Doctor) => {
    setDoctors((prev) => prev.map((d) => (d.id === doctor.id ? doctor : d)));
  };

  const removeDoctor = (id: number) => {
    setDoctors((prev) => prev.filter((d) => d.id !== id));
  };

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
      <span data-testid="doctors-count">{doctors.length}</span>
      {doctors[0] && (
        <>
          <span data-testid="doctor-name">{doctors[0].name}</span>
          <span data-testid="doctor-email">{doctors[0].email}</span>
        </>
      )}
      <button
        onClick={() =>
          addDoctor({
            id: 1,
            name: "Dr. Alice",
            fullName: "Dra. Alice Silva",
            crm: "12345",
            specialty: "Cardiology",
            email: "alice@example.com",
            phone: "11999999999",
            isActive: true,
          })
        }
      >
        Add
      </button>
      <button
        onClick={() =>
          updateDoctor({
            id: 1,
            name: "Dr. Bob",
            fullName: "Dr. Bob Souza",
            crm: "12345",
            specialty: "Cardiology",
            email: "bob@example.com",
            phone: "11999999999",
            isActive: true,
          })
        }
      >
        Update
      </button>
      <button onClick={() => removeDoctor(1)}>Remove</button>
    </div>
  );
};

describe("DoctorContext", () => {
  it("inicia vazio e permite adicionar, atualizar e remover médicos", async () => {
    render(
      <DoctorProvider>
        <TestComponent />
      </DoctorProvider>
    );

    const count = screen.getByTestId("doctors-count");
    const user = userEvent.setup();

    // Inicialmente vazio
    expect(count.textContent).toBe("0");

    // Adicionar
    await user.click(screen.getByText("Add"));
    expect(count.textContent).toBe("1");
    expect(screen.getByTestId("doctor-name").textContent).toBe("Dr. Alice");
    expect(screen.getByTestId("doctor-email").textContent).toBe("alice@example.com");

    // Atualizar
    await user.click(screen.getByText("Update"));
    expect(screen.getByTestId("doctor-name").textContent).toBe("Dr. Bob");
    expect(screen.getByTestId("doctor-email").textContent).toBe("bob@example.com");

    // Remover
    await user.click(screen.getByText("Remove"));
    expect(count.textContent).toBe("0");
  });
});
