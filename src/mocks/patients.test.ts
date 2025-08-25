// src/mocks/patients.test.ts

import { patientsMock } from "./patients";

describe("patientsMock", () => {
  it("deve conter pacientes com os campos corretos e tipos válidos", () => {
    expect(patientsMock.length).toBeGreaterThan(0);

    const patient = patientsMock[0];

    expect(patient).toHaveProperty("id");
    expect(patient).toHaveProperty("name");
    expect(patient).toHaveProperty("cpf");
    expect(patient).toHaveProperty("dateOfBirth");
    expect(patient).toHaveProperty("email");
    expect(patient).toHaveProperty("phone");
    expect(patient).toHaveProperty("address");
    expect(patient).toHaveProperty("gender");

    expect(typeof patient.id).toBe("number");
    expect(typeof patient.name).toBe("string");
    expect(typeof patient.cpf).toBe("string");
    expect(typeof patient.dateOfBirth).toBe("string");
    expect(typeof patient.email).toBe("string");
    expect(typeof patient.phone).toBe("string");
    expect(typeof patient.address).toBe("string");
    expect(typeof patient.gender).toBe("string");
  });

  it("todos os pacientes devem ter os campos corretos e tipos válidos", () => {
    patientsMock.forEach((patient) => {
      expect(typeof patient.id).toBe("number");
      expect(typeof patient.name).toBe("string");
      expect(typeof patient.cpf).toBe("string");
      expect(typeof patient.dateOfBirth).toBe("string");
      expect(typeof patient.email).toBe("string");
      expect(typeof patient.phone).toBe("string");
      expect(typeof patient.address).toBe("string");
      expect(typeof patient.gender).toBe("string");
    });
  });
});
