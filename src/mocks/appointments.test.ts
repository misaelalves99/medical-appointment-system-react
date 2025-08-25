// src/mocks/appointments.test.ts

import { appointmentsMock } from "./appointments";
import { AppointmentStatus } from "../types/Appointment";

describe("appointmentsMock", () => {
  it("deve conter pelo menos um agendamento com os campos corretos", () => {
    expect(appointmentsMock.length).toBeGreaterThan(0);

    const appointment = appointmentsMock[0];

    expect(appointment).toHaveProperty("id");
    expect(appointment).toHaveProperty("patientId");
    expect(appointment).toHaveProperty("patientName");
    expect(appointment).toHaveProperty("doctorId");
    expect(appointment).toHaveProperty("doctorName");
    expect(appointment).toHaveProperty("appointmentDate");
    expect(appointment).toHaveProperty("status");
    expect(appointment).toHaveProperty("notes");

    expect(typeof appointment.id).toBe("number");
    expect(typeof appointment.patientName).toBe("string");
    expect(typeof appointment.doctorName).toBe("string");
    expect(typeof appointment.appointmentDate).toBe("string");
    expect(Object.values(AppointmentStatus)).toContain(appointment.status);
  });
});
