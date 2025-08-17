import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./CancelAppointment.module.css";
import { useAppointments } from "../../../hooks/useAppointments";

const CancelAppointment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { appointments, cancelAppointment } = useAppointments();

  const appointment = appointments.find(a => a.id === Number(id));

  if (!appointment) return <p>Consulta não encontrada.</p>;

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    cancelAppointment(appointment.id);
    navigate("/appointments");
  };

  return (
    <div className={styles.cancelContainer}>
      <h1>Cancelar Consulta</h1>
      <p>Tem certeza que deseja cancelar esta consulta?</p>

      <ul>
        <li><strong>Data e Hora:</strong> {new Date(appointment.appointmentDate).toLocaleString("pt-BR")}</li>
        <li><strong>Paciente:</strong> {appointment.patientName ?? `ID ${appointment.patientId}`}</li>
        <li><strong>Médico:</strong> {appointment.doctorName ?? `ID ${appointment.doctorId}`}</li>
      </ul>

      <form onSubmit={handleCancel}>
        <button type="submit" className={styles.btnDanger}>Confirmar Cancelamento</button>
      </form>

      <button type="button" className={styles.backLink} onClick={() => navigate("/appointments")}>
        Voltar
      </button>
    </div>
  );
};

export default CancelAppointment;
