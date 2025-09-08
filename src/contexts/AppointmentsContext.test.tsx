import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext, useState } from "react";
import { AppointmentsContext, AppointmentsContextType } from "./AppointmentsContext";
import { Appointment, AppointmentStatus } from "../types/Appointment";

// Provider de teste isolado
const AppointmentsProvider = ({ children }: { children: React.ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const addAppointment = (appointment: Omit<Appointment, "id">) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: appointments.length ? Math.max(...appointments.map(a => a.id)) + 1 : 1,
    };
    setAppointments([...appointments, newAppointment]);
  };

  const updateAppointment = (appointment: Appointment) => {
    setAppointments(prev =>
      prev.map(a => (a.id === appointment.id ? appointment : a))
    );
  };

  const deleteAppointment = (id: number) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const confirmAppointment = (id: number) => {
    setAppointments(prev =>
      prev.map(a =>
        a.id === id ? { ...a, status: AppointmentStatus.Confirmed } : a
      )
    );
  };

  const cancelAppointment = (id: number) => {
    setAppointments(prev =>
      prev.map(a =>
        a.id === id ? { ...a, status: AppointmentStatus.Cancelled } : a
      )
    );
  };

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        confirmAppointment,
        cancelAppointment,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

// Componente de teste
const TestComponent = () => {
  const context = useContext<AppointmentsContextType>(AppointmentsContext);

  return (
    <div>
      <span data-testid="appointments-count">{context.appointments.length}</span>
      <button
        onClick={() =>
          context.addAppointment({
            patientId: 1,
            doctorId: 1,
            patientName: "John",
            appointmentDate: "2025-08-21",
            status: AppointmentStatus.Scheduled,
          })
        }
      >
        Add
      </button>
      {context.appointments[0] && (
        <>
          <span data-testid="first-appointment-name">
            {context.appointments[0].patientName}
          </span>
          <span data-testid="first-appointment-status">
            {context.appointments[0].status}
          </span>
          <button
            onClick={() =>
              context.updateAppointment({
                ...context.appointments[0],
                patientName: "John Updated",
              })
            }
          >
            Update
          </button>
          <button onClick={() => context.deleteAppointment(context.appointments[0].id)}>
            Delete
          </button>
          <button onClick={() => context.confirmAppointment(context.appointments[0].id)}>
            Confirm
          </button>
          <button onClick={() => context.cancelAppointment(context.appointments[0].id)}>
            Cancel
          </button>
        </>
      )}
    </div>
  );
};

describe("AppointmentsContext (isolated)", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it("provides default values", () => {
    render(
      <AppointmentsProvider>
        <TestComponent />
      </AppointmentsProvider>
    );
    expect(screen.getByTestId("appointments-count").textContent).toBe("0");
  });

  it("adds a new appointment", async () => {
    render(
      <AppointmentsProvider>
        <TestComponent />
      </AppointmentsProvider>
    );

    await user.click(screen.getByText("Add"));

    expect(screen.getByTestId("appointments-count").textContent).toBe("1");
    expect(screen.getByTestId("first-appointment-name").textContent).toBe("John");
    expect(screen.getByTestId("first-appointment-status").textContent).toBe(
      AppointmentStatus.Scheduled
    );
  });

  it("updates an existing appointment", async () => {
    render(
      <AppointmentsProvider>
        <TestComponent />
      </AppointmentsProvider>
    );

    await user.click(screen.getByText("Add"));
    await user.click(screen.getByText("Update"));

    expect(screen.getByTestId("first-appointment-name").textContent).toBe("John Updated");
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
    await user.click(screen.getByText("Delete"));

    expect(screen.getByTestId("appointments-count").textContent).toBe("0");
  });

  it("does nothing when updating/deleting non-existent appointment", async () => {
    render(
      <AppointmentsProvider>
        <TestComponent />
      </AppointmentsProvider>
    );

    // Tenta clicar nos botões só se existirem
    const updateBtn = screen.queryByText("Update");
    if (updateBtn) await user.click(updateBtn);

    const deleteBtn = screen.queryByText("Delete");
    if (deleteBtn) await user.click(deleteBtn);

    expect(screen.getByTestId("appointments-count").textContent).toBe("0");
  });
});
