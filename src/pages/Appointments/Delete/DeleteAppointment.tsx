// src/pages/Appointments/Delete/DeleteAppointment.tsx

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DeleteAppointment.module.css";
import { useAppointments } from "../../../hooks/useAppointments";

const DeleteAppointment: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // id opcional
  const navigate = useNavigate();
  const { appointments, deleteAppointment } = useAppointments();

  if (!id) {
    return <p>Consulta não encontrada.</p>;
  }

  const appointmentId = Number(id);
  const appointment = appointments.find(a => a.id === appointmentId);

  if (!appointment) {
    return <p>Consulta não encontrada.</p>;
  }

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    deleteAppointment(appointmentId);
    navigate("/appointments");
  };

  return (
    <div className={styles.deleteContainer}>
      <h1>Excluir Consulta</h1>
      <p>Tem certeza de que deseja excluir a consulta <strong>{appointment.id}</strong>?</p>

      <div className={styles.actions}>
        <button type="button" className={styles.btnSecondary} onClick={() => navigate("/appointments")}>
          Cancelar
        </button>
        <button type="button" className={styles.btnDanger} onClick={handleDelete}>
          Excluir
        </button>
      </div>
    </div>
  );
};

export default DeleteAppointment;
