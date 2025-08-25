// src/pages/Appointments/ConfirmAppointment.test.tsx

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ConfirmAppointment.module.css";
import { useAppointments } from "../../../hooks/useAppointments";

const ConfirmAppointment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { appointments, confirmAppointment } = useAppointments();

  const appointment = appointments.find(a => a.id === Number(id));

  if (!appointment) return <p>Consulta não encontrada.</p>;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    confirmAppointment(appointment.id);
    navigate("/appointments");
  };

  return (
    <div className={styles.confirmContainer}>
      <h1>Confirmar Consulta</h1>
      <p>Deseja confirmar esta consulta?</p>

      <ul>
        <li><strong>Data e Hora:</strong> {new Date(appointment.appointmentDate).toLocaleString("pt-BR")}</li>
        <li><strong>Paciente:</strong> {appointment.patientName ?? `ID ${appointment.patientId}`}</li>
        <li><strong>Médico:</strong> {appointment.doctorName ?? `ID ${appointment.doctorId}`}</li>
      </ul>

      <form onSubmit={handleConfirm}>
        <button type="submit" className={styles.btnSuccess}>Confirmar</button>
      </form>

      <button type="button" className={styles.backLink} onClick={() => navigate("/appointments")}>
        Cancelar
      </button>
    </div>
  );
};

export default ConfirmAppointment;
