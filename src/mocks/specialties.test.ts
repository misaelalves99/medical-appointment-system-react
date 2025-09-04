// src/mocks/specialties.test.ts

import { specialtiesMock } from "./specialties";

describe("specialtiesMock", () => {
  it("deve conter especialidades e todos os itens devem ter campos corretos e tipos válidos", () => {
    expect(specialtiesMock.length).toBeGreaterThan(0);

    specialtiesMock.forEach((specialty) => {
      expect(specialty).toHaveProperty("id");
      expect(specialty).toHaveProperty("name");

      expect(typeof specialty.id).toBe("number");
      expect(typeof specialty.name).toBe("string");
    });
  });
});
