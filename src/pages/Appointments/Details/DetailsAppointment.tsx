// src/pages/Appointment/Details/DetailsAppointment.tsx

import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./DetailsAppointment.module.css";

export interface Appointment {
  id: number;
  patientId: number;
  patient?: { fullName: string };
  doctorId: number;
  doctor?: { fullName: string };
  appointmentDate: string; // ISO date string
  status: string;
  notes?: string;
}

const AppointmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Simulação de dados — depois você pode substituir por fetch API
  const appointment: Appointment = {
    id: Number(id),
    patientId: 1,
    patient: { fullName: "João da Silva" },
    doctorId: 2,
    doctor: { fullName: "Dra. Maria Oliveira" },
    appointmentDate: "2025-08-15T14:30",
    status: "Confirmada",
    notes: "Paciente apresentou melhora significativa."
  };

  return (
    <div className={styles.appointmentDetailsContainer}>
      <h1>Detalhes da Consulta</h1>

      <div className={styles.infoRow}>
        <span className={styles.infoLabel}>Paciente</span>
        <span className={styles.infoValue}>
          {appointment.patient?.fullName ?? `ID ${appointment.patientId}`}
        </span>
      </div>

      <div className={styles.infoRow}>
        <span className={styles.infoLabel}>Médico</span>
        <span className={styles.infoValue}>
          {appointment.doctor?.fullName ?? `ID ${appointment.doctorId}`}
        </span>
      </div>

      <div className={styles.infoRow}>
        <span className={styles.infoLabel}>Data e Hora</span>
        <span className={styles.infoValue}>
          {new Date(appointment.appointmentDate).toLocaleString("pt-BR")}
        </span>
      </div>

      <div className={styles.infoRow}>
        <span className={styles.infoLabel}>Status</span>
        <span className={styles.infoValue}>{appointment.status}</span>
      </div>

      <div className={styles.notes}>{appointment.notes}</div>

      <div className={styles.actions}>
        <Link to={`/appointments/edit/${appointment.id}`}>Editar</Link>
        <Link to="/appointments">Voltar</Link>
      </div>
    </div>
  );
};

export default AppointmentDetails;
