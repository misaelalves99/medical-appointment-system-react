// src/mocks/patients.test.ts
import { patientsMock } from "./patients";

describe("patientsMock", () => {
  it("deve conter pacientes e todos os pacientes devem ter campos corretos e tipos válidos", () => {
    expect(patientsMock.length).toBeGreaterThan(0);

    patientsMock.forEach((patient) => {
      expect(patient).toHaveProperty("id");
      expect(patient).toHaveProperty("name");
      expect(patient).toHaveProperty("cpf");
      expect(patient).toHaveProperty("dateOfBirth");
      expect(patient).toHaveProperty("email");
      expect(patient).toHaveProperty("phone");
      expect(patient).toHaveProperty("address");
      expect(patient).toHaveProperty("gender");

      expect(typeof patient.id).toBe("number");
      expect(patient.id).toBeGreaterThan(0);
      expect(typeof patient.name).toBe("string");
      expect(patient.name.length).toBeGreaterThan(0);
      expect(typeof patient.cpf).toBe("string");
      expect(patient.cpf).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/); // CPF básico
      expect(typeof patient.dateOfBirth).toBe("string");
      expect(patient.dateOfBirth).toMatch(/^\d{4}-\d{2}-\d{2}$/); // YYYY-MM-DD
      expect(typeof patient.email).toBe("string");
      expect(patient.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); // formato simples de email
      expect(typeof patient.phone).toBe("string");
      expect(patient.phone.length).toBeGreaterThan(0);
      expect(typeof patient.address).toBe("string");
      expect(patient.address.length).toBeGreaterThan(0);
      expect(typeof patient.gender).toBe("string");
      expect(["Masculino", "Feminino"]).toContain(patient.gender);
    });
  });
});
