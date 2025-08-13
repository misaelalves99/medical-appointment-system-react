// src/pages/Appointment/Delete/DeleteAppointment.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DeleteAppointment.module.css";

import { Appointment, AppointmentStatus } from "../../../types/Appointment";

interface DeleteAppointmentProps {
  appointment: Appointment;
  onDelete: (id: number) => void;
}

// Função para converter enum para string legível (em português)
const getStatusLabel = (status: AppointmentStatus): string => {
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

const DeleteAppointment: React.FC<DeleteAppointmentProps> = ({ appointment, onDelete }) => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDelete(appointment.id);
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
        <dd>{getStatusLabel(appointment.status)}</dd>
      </dl>

      <form onSubmit={handleSubmit}>
        <button type="submit" className={styles.btnDanger}>
          Excluir
        </button>
        <button
          type="button"
          className={styles.btnSecondary}
          onClick={() => navigate("/appointments")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default DeleteAppointment;
