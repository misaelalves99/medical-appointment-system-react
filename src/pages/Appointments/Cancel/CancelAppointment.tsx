// src/pages/Appointments/Cancel/CancelAppointment.tsx

import React from "react";
import styles from "./CancelAppointment.module.css";

interface Patient {
  id: number;
  fullName?: string;
}

interface Doctor {
  id: number;
  fullName?: string;
}

interface Appointment {
  id: number;
  appointmentDate: string; // formato ISO
  patient?: Patient;
  patientId: number;
  doctor?: Doctor;
  doctorId: number;
}

interface CancelAppointmentProps {
  appointment: Appointment;
  onCancel: (id: number) => void;
  onBack: () => void;
}

const CancelAppointment: React.FC<CancelAppointmentProps> = ({
  appointment,
  onCancel,
  onBack,
}) => {
  return (
    <div className={styles.cancelContainer}>
      <h1>Cancelar Consulta</h1>
      <p>Tem certeza de que deseja cancelar esta consulta?</p>

      <ul>
        <li>
          <strong>Data e Hora:</strong>{" "}
          {new Date(appointment.appointmentDate).toLocaleString("pt-BR")}
        </li>
        <li>
          <strong>Paciente:</strong>{" "}
          {appointment.patient?.fullName || `ID ${appointment.patientId}`}
        </li>
        <li>
          <strong>Médico:</strong>{" "}
          {appointment.doctor?.fullName || `ID ${appointment.doctorId}`}
        </li>
      </ul>

      <button
        type="button"
        className={styles.btnDanger}
        onClick={() => onCancel(appointment.id)}
      >
        Confirmar Cancelamento
      </button>

      <button type="button" className={styles.backLink} onClick={onBack}>
        Voltar
      </button>
    </div>
  );
};

export default CancelAppointment;
