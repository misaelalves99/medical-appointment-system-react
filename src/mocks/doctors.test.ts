// src/mocks/doctors.test.ts
import { doctorsMock } from "./doctors";

describe("doctorsMock", () => {
  it("deve conter pelo menos um médico", () => {
    expect(doctorsMock.length).toBeGreaterThan(0);
  });

  it("cada médico deve ter todos os campos corretos e tipos válidos", () => {
    doctorsMock.forEach((doctor) => {
      expect(doctor).toHaveProperty("id");
      expect(doctor).toHaveProperty("name");
      expect(doctor).toHaveProperty("crm");
      expect(doctor).toHaveProperty("specialty");
      expect(doctor).toHaveProperty("email");
      expect(doctor).toHaveProperty("phone");
      expect(doctor).toHaveProperty("isActive");

      expect(typeof doctor.id).toBe("number");
      expect(doctor.id).toBeGreaterThan(0);
      expect(typeof doctor.name).toBe("string");
      expect(doctor.name.length).toBeGreaterThan(0);
      expect(typeof doctor.crm).toBe("string");
      expect(doctor.crm.length).toBeGreaterThan(0);
      expect(typeof doctor.specialty).toBe("string");
      expect(doctor.specialty.length).toBeGreaterThan(0);
      expect(typeof doctor.email).toBe("string");
      expect(doctor.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); // formato simples de email
      expect(typeof doctor.phone).toBe("string");
      expect(doctor.phone.length).toBeGreaterThan(0);
      expect(typeof doctor.isActive).toBe("boolean");
    });
  });
});
