// src/pages/Appointment/Details/DetailsAppointment.tsx

import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./DetailsAppointment.module.css";
import { AppointmentStatus } from "../../../types/Appointment";
import { useAppointments } from "../../../hooks/useAppointments";
import { usePatient } from "../../../hooks/usePatient";
import { useDoctor } from "../../../hooks/useDoctor";

const AppointmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const appointmentId = Number(id);

  const { appointments } = useAppointments();
  const { patients } = usePatient();
  const { doctors } = useDoctor();

  const appointment = appointments.find(a => a.id === appointmentId);

  const patientName = useMemo(() => {
    if (!appointment) return "";
    return patients.find(p => p.id === appointment.patientId)?.name ?? `ID ${appointment.patientId}`;
  }, [appointment, patients]);

  const doctorName = useMemo(() => {
    if (!appointment) return "";
    return doctors.find(d => d.id === appointment.doctorId)?.name ?? `ID ${appointment.doctorId}`;
  }, [appointment, doctors]);

  if (!appointment) {
    return <p>Consulta não encontrada.</p>;
  }

  const statusLabel = () => {
    switch (appointment.status) {
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

  return (
    <div className={styles.appointmentDetailsContainer}>
      <h1>Detalhes da Consulta</h1>

      <div className={styles.infoRow}>
        <span className={styles.infoLabel}>Paciente</span>
        <span className={styles.infoValue}>{patientName}</span>
      </div>

      <div className={styles.infoRow}>
        <span className={styles.infoLabel}>Médico</span>
        <span className={styles.infoValue}>{doctorName}</span>
      </div>

      <div className={styles.infoRow}>
        <span className={styles.infoLabel}>Data e Hora</span>
        <span className={styles.infoValue}>
          {new Date(appointment.appointmentDate).toLocaleString("pt-BR")}
        </span>
      </div>

      <div className={styles.infoRow}>
        <span className={styles.infoLabel}>Status</span>
        <span className={styles.infoValue}>{statusLabel()}</span>
      </div>

      {appointment.notes && (
        <div className={styles.notes}>
          <strong>Observações:</strong> {appointment.notes}
        </div>
      )}

      <div className={styles.actions}>
        <Link to={`/appointments/edit/${appointment.id}`}>Editar</Link>
        <Link to="/appointments">Voltar</Link>
      </div>
    </div>
  );
};

export default AppointmentDetails;
