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
