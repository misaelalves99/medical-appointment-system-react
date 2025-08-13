// src/pages/Appointments/Calendar/CalendarAppointments.tsx

import React from "react";
import styles from "./CalendarAppointments.module.css";

import { Appointment as AppointmentType, AppointmentStatus } from "../../../types/Appointment";

interface CalendarAppointmentsProps {
  appointments: AppointmentType[];
  onBack: () => void;
}

// Helper para converter enum para string legível
const statusToString = (status: AppointmentStatus) => {
  switch (status) {
    case AppointmentStatus.Scheduled:
      return "Agendada";
    case AppointmentStatus.Confirmed:
      return "Confirmada";
    case AppointmentStatus.Cancelled:
      return "Cancelada";
    case AppointmentStatus.Completed:
      return "Concluída";
    default:
      return "Desconhecido";
  }
};

const CalendarAppointments: React.FC<CalendarAppointmentsProps> = ({
  appointments,
  onBack,
}) => {
  const sortedAppointments = [...appointments].sort(
    (a, b) =>
      new Date(a.appointmentDate).getTime() -
      new Date(b.appointmentDate).getTime()
  );

  return (
    <div className={styles.calendarContainer}>
      <h1>Calendário de Consultas</h1>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Hora</th>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedAppointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>
                {new Date(appointment.appointmentDate).toLocaleDateString(
                  "pt-BR"
                )}
              </td>
              <td>
                {new Date(appointment.appointmentDate).toLocaleTimeString(
                  "pt-BR",
                  { hour: "2-digit", minute: "2-digit" }
                )}
              </td>
              <td>
                {appointment.patientName || `ID ${appointment.patientId}`}
              </td>
              <td>{appointment.doctorName || `ID ${appointment.doctorId}`}</td>
              <td>{statusToString(appointment.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className={styles.backLink} onClick={onBack}>
        Voltar
      </button>
    </div>
  );
};

export default CalendarAppointments;
