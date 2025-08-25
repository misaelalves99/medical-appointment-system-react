// src/pages/Appointments/Delete/DeleteAppointment.tsx

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DeleteAppointment.module.css";
import { useAppointments } from "../../../hooks/useAppointments";
import { AppointmentStatus } from "../../../types/Appointment";

const getStatusLabel = (status: AppointmentStatus): string => {
  switch (status) {
    case AppointmentStatus.Scheduled: return "Agendada";
    case AppointmentStatus.Confirmed: return "Confirmada";
    case AppointmentStatus.Cancelled: return "Cancelada";
    case AppointmentStatus.Completed: return "Concluída";
    default: return "Desconhecido";
  }
};

const DeleteAppointment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { appointments, deleteAppointment } = useAppointments();

  const appointment = appointments.find(a => a.id === Number(id));

  if (!appointment) return <p>Consulta não encontrada.</p>;

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    deleteAppointment(appointment.id);
    navigate("/appointments");
  };

  return (
    <div className={styles.deleteContainer}>
      <h1>Excluir Consulta</h1>
      <h3>Tem certeza que deseja excluir esta consulta?</h3>

      <dl>
        <dt>Paciente</dt>
        <dd>{appointment.patientName ?? `ID ${appointment.patientId}`}</dd>

        <dt>Médico</dt>
        <dd>{appointment.doctorName ?? `ID ${appointment.doctorId}`}</dd>

        <dt>Data e Hora</dt>
        <dd>{new Date(appointment.appointmentDate).toLocaleString("pt-BR")}</dd>

        <dt>Status</dt>
        <dd>{appointment.status !== undefined ? getStatusLabel(appointment.status) : "Desconhecido"}</dd>
      </dl>

      <form onSubmit={handleDelete}>
        <button type="submit" className={styles.btnDanger}>Excluir</button>
        <button type="button" className={styles.btnSecondary} onClick={() => navigate("/appointments")}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default DeleteAppointment;
