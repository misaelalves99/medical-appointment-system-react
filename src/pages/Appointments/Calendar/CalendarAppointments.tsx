// src/pages/Appointments/CalendarAppointments.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CalendarAppointments.module.css";
import { AppointmentStatus } from "../../../types/Appointment";
import { useAppointments } from "../../../hooks/useAppointments";

const statusToString = (status: AppointmentStatus) => {
  switch (status) {
    case AppointmentStatus.Scheduled: return "Agendada";
    case AppointmentStatus.Confirmed: return "Confirmada";
    case AppointmentStatus.Cancelled: return "Cancelada";
    case AppointmentStatus.Completed: return "Concluída";
    default: return "Desconhecido";
  }
};

const CalendarAppointments: React.FC = () => {
  const navigate = useNavigate();
  const { appointments } = useAppointments();

  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime()
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
          {sortedAppointments.map(a => (
            <tr key={a.id}>
              <td>{new Date(a.appointmentDate).toLocaleDateString("pt-BR")}</td>
              <td>{new Date(a.appointmentDate).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</td>
              <td>{a.patientName ?? `ID ${a.patientId}`}</td>
              <td>{a.doctorName ?? `ID ${a.doctorId}`}</td>
              <td>{statusToString(a.status)}</td>
            </tr>
          ))}
          {sortedAppointments.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: "1rem" }}>
                Nenhuma consulta cadastrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <button className={styles.backLink} onClick={() => navigate("/appointments")}>
        Voltar
      </button>
    </div>
  );
};

export default CalendarAppointments;
