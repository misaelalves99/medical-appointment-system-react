// src/pages/Appointment/Confirm/ConfirmAppointment.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ConfirmAppointment.module.css";

export interface Appointment {
  id: number;
  patientId: number;
  patient?: { fullName: string };
  doctorId: number;
  doctor?: { fullName: string };
  appointmentDate: string;
}

interface ConfirmAppointmentProps {
  appointment: Appointment;
  onConfirm: (id: number) => void;
}

const ConfirmAppointment: React.FC<ConfirmAppointmentProps> = ({ appointment, onConfirm }) => {
  const navigate = useNavigate();

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(appointment.id);
  };

  return (
    <div className={styles.confirmContainer}>
      <h1>Confirmar Consulta</h1>
      <p>Deseja confirmar esta consulta?</p>

      <ul>
        <li>
          <strong>Data e Hora:</strong>{" "}
          {new Date(appointment.appointmentDate).toLocaleString("pt-BR")}
        </li>
        <li>
          <strong>Paciente:</strong>{" "}
          {appointment.patient?.fullName ?? `ID ${appointment.patientId}`}
        </li>
        <li>
          <strong>Médico:</strong>{" "}
          {appointment.doctor?.fullName ?? `ID ${appointment.doctorId}`}
        </li>
      </ul>

      <form onSubmit={handleConfirm}>
        <button type="submit" className={styles.btnSuccess}>
          Confirmar
        </button>
      </form>

      <button
        type="button"
        className={styles.backLink}
        onClick={() => navigate("/appointments")}
      >
        Cancelar
      </button>
    </div>
  );
};

export default ConfirmAppointment;
