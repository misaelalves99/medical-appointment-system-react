// src/mocks/specialties.test.ts

import { specialtiesMock } from "./specialties";

describe("specialtiesMock", () => {
  it("deve conter especialidades com os campos corretos e tipos válidos", () => {
    expect(specialtiesMock.length).toBeGreaterThan(0);

    const specialty = specialtiesMock[0];

    expect(specialty).toHaveProperty("id");
    expect(specialty).toHaveProperty("name");

    expect(typeof specialty.id).toBe("number");
    expect(typeof specialty.name).toBe("string");
  });

  it("todas as especialidades devem ter os campos corretos e tipos válidos", () => {
    specialtiesMock.forEach((specialty) => {
      expect(typeof specialty.id).toBe("number");
      expect(typeof specialty.name).toBe("string");
    });
  });
});
