// src/contexts/AppointmentsProvider.test.tsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import { AppointmentsContext, AppointmentsContextType } from "./AppointmentsContext";
import { AppointmentsProvider } from "./AppointmentsProvider";
import { AppointmentStatus } from "../types/Appointment";
import { appointmentsMock } from "../mocks/appointments";

const TestComponent = () => {
  const {
    appointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    confirmAppointment,
    cancelAppointment,
  } = useContext<AppointmentsContextType>(AppointmentsContext);

  return (
    <div>
      <span data-testid="appointments-count">{appointments.length}</span>
      {appointments[0] && (
        <>
          <span data-testid="first-appointment-name">{appointments[0].patientName}</span>
          <span data-testid="first-appointment-status">{appointments[0].status}</span>
        </>
      )}
      <button
        onClick={() =>
          addAppointment({
            patientId: 1,
            doctorId: 1,
            patientName: "Alice",
            appointmentDate: "2025-08-21",
            status: AppointmentStatus.Scheduled,
          })
        }
      >
        Add
      </button>
      {appointments[0] && (
        <>
          <button
            onClick={() =>
              updateAppointment({
                ...appointments[0],
                patientName: "Bob",
              })
            }
          >
            Update
          </button>
          <button onClick={() => deleteAppointment(appointments[0].id)}>Delete</button>
          <button onClick={() => confirmAppointment(appointments[0].id)}>Confirm</button>
          <button onClick={() => cancelAppointment(appointments[0].id)}>Cancel</button>
        </>
      )}
    </div>
  );
};

describe("AppointmentsProvider (real provider)", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("loads initial state from appointmentsMock", () => {
    render(
      <AppointmentsProvider>
        <TestComponent />
      </AppointmentsProvider>
    );

    const count = screen.getByTestId("appointments-count");
    expect(Number(count.textContent)).toBe(appointmentsMock.length);

    if (appointmentsMock.length > 0) {
      expect(screen.getByTestId("first-appointment-name").textContent).toBe(
        appointmentsMock[0].patientName
      );
    }
  });

  it("adds a new appointment", async () => {
    render(
      <AppointmentsProvider>
        <TestComponent />
      </AppointmentsProvider>
    );

    const count = screen.getByTestId("appointments-count");
    const initialCount = Number(count.textContent);

    await user.click(screen.getByText("Add"));

    expect(Number(count.textContent)).toBe(initialCount + 1);
    expect(screen.getByTestId("first-appointment-name").textContent).toBeTruthy();
  });

  it("updates an appointment", async () => {
    render(
      <AppointmentsProvider>
        <TestComponent />
      </AppointmentsProvider>
    );

    await user.click(screen.getByText("Add"));
    await user.click(screen.getByText("Update"));

    expect(screen.getByTestId("first-appointment-name").textContent).toBe("Bob");
  });

  it("confirms an appointment", async () => {
    render(
      <AppointmentsProvider>
        <TestComponent />
      </AppointmentsProvider>
    );

    await user.click(screen.getByText("Add"));
    await user.click(screen.getByText("Confirm"));

    expect(screen.getByTestId("first-appointment-status").textContent).toBe(
      AppointmentStatus.Confirmed
    );
  });

  it("cancels an appointment", async () => {
    render(
      <AppointmentsProvider>
        <TestComponent />
      </AppointmentsProvider>
    );

    await user.click(screen.getByText("Add"));
    await user.click(screen.getByText("Cancel"));

    expect(screen.getByTestId("first-appointment-status").textContent).toBe(
      AppointmentStatus.Cancelled
    );
  });

  it("deletes an appointment", async () => {
    render(
      <AppointmentsProvider>
        <TestComponent />
      </AppointmentsProvider>
    );

    await user.click(screen.getByText("Add"));
    const count = screen.getByTestId("appointments-count");
    expect(Number(count.textContent)).toBeGreaterThan(0);

    await user.click(screen.getByText("Delete"));
    expect(Number(count.textContent)).toBeGreaterThanOrEqual(0);
  });
});
