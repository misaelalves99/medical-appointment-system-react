// src/pages/Appointments/Delete/DeleteAppointment.tsx

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DeleteAppointment.module.css";
import { useAppointments } from "../../../hooks/useAppointments";

const DeleteAppointment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { appointments, deleteAppointment } = useAppointments();

  if (!id) return <p>Agendamento não encontrado.</p>;

  const appointmentId = Number(id);
  const appointment = appointments.find(a => a.id === appointmentId);

  if (!appointment) return <p>Agendamento não encontrado.</p>;

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    deleteAppointment(appointment.id);
    navigate("/appointments");
  };

  // Corrigido: usar appointmentDate do tipo Appointment
  const appointmentDate = new Date(appointment.appointmentDate);
  const formattedDate = appointmentDate.toLocaleDateString();
  const formattedTime = appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={styles.container}>
      <h1>Confirmar Exclusão</h1>
      <p>
        Tem certeza de que deseja excluir o agendamento de{" "}
        <strong>{appointment.patientName}</strong> com{" "}
        <strong>{appointment.doctorName}</strong> no dia{" "}
        <strong>{formattedDate}</strong> às <strong>{formattedTime}</strong>?
      </p>

      <form onSubmit={handleDelete}>
        <button type="submit" className={styles.deleteButton}>
          Excluir
        </button>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={() => navigate("/appointments")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default DeleteAppointment;
