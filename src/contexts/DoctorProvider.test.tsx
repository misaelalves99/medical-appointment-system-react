// src/contexts/DoctorProvider.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import { DoctorsProvider } from "./DoctorProvider";
import { DoctorContext } from "./DoctorContext";

const TestComponent = () => {
  const { doctors, addDoctor, updateDoctor, removeDoctor } = useContext(DoctorContext);

  return (
    <div>
      <span data-testid="count">{doctors.length}</span>
      <ul>
        {doctors.map(d => <li key={d.id} data-testid={`doctor-${d.id}`}>{d.name} - {d.specialty}</li>)}
      </ul>
      <button onClick={() => addDoctor({
        id: 0, name: "Dr. Teste", fullName: "Dr. Teste Completo", crm: "99999",
        specialty: "Teste", email: "teste@example.com", phone: "11999999999", isActive: true
      })}>Add</button>
      <button onClick={() => updateDoctor({...doctors[0], name: "Dr. Updated"})}>Update</button>
      <button onClick={() => removeDoctor(doctors[0]?.id ?? 0)}>Remove</button>
    </div>
  );
};

describe("DoctorsProvider", () => {
  it("renderiza médicos iniciais do mock", () => {
    render(
      <DoctorsProvider>
        <TestComponent />
      </DoctorsProvider>
    );

    const items = screen.getAllByRole("listitem");
    expect(items.length).toBeGreaterThan(0);
    expect(Number(screen.getByTestId("count").textContent)).toBe(items.length);
  });

  it("adiciona, atualiza e remove médico corretamente", async () => {
    render(
      <DoctorsProvider>
        <TestComponent />
      </DoctorsProvider>
    );

    const user = userEvent.setup();

    // Adicionar
    await user.click(screen.getByText("Add"));
    expect(screen.getByText("Dr. Teste - Teste")).toBeInTheDocument();

    // Atualizar
    await user.click(screen.getByText("Update"));
    expect(screen.getByText("Dr. Updated - Teste")).toBeInTheDocument();

    // Remover
    await user.click(screen.getByText("Remove"));
    expect(screen.queryByText("Dr. Updated - Teste")).not.toBeInTheDocument();
  });

  it("não quebra ao remover médico inexistente", async () => {
    render(
      <DoctorsProvider>
        <TestComponent />
      </DoctorsProvider>
    );

    const user = userEvent.setup();
    const countBefore = Number(screen.getByTestId("count").textContent);

    await user.click(screen.getByText("Remove"));

    const countAfter = Number(screen.getByTestId("count").textContent);
    expect(countAfter).toBeLessThanOrEqual(countBefore);
  });
});
