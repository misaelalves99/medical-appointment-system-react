// src/pages/Doctor/Availability/Availability.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Availability.module.css";
import type { DoctorAvailability } from "../../../types/DoctorAvailability";
import { useDoctor } from "../../../hooks/useDoctor";

interface AvailabilityProps {
  availabilities: DoctorAvailability[];
}

const Availability: React.FC<AvailabilityProps> = ({ availabilities }) => {
  const navigate = useNavigate();
  const { doctors } = useDoctor();

  const sortedAvailabilities = [...availabilities].sort((a, b) => {
    const dateA = new Date(a.date + "T" + a.startTime).getTime();
    const dateB = new Date(b.date + "T" + b.startTime).getTime();
    return dateA - dateB;
  });

  const getDoctorName = (doctorId: number) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : `ID ${doctorId}`;
  };

  return (
    <div className={styles.availabilityContainer}>
      <h1>Disponibilidade dos Médicos</h1>

      <table>
        <thead>
          <tr>
            <th>Médico</th>
            <th>Data</th>
            <th>Hora Início</th>
            <th>Hora Fim</th>
            <th>Disponível</th>
          </tr>
        </thead>
        <tbody>
          {sortedAvailabilities.map((availability, index) => (
            <tr key={index}>
              <td>{getDoctorName(availability.doctorId)}</td>
              <td>{new Date(availability.date).toLocaleDateString("pt-BR")}</td>
              <td>{availability.startTime}</td>
              <td>{availability.endTime}</td>
              <td>{availability.isAvailable ? "Sim" : "Não"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className={styles.backButton}
        onClick={() => navigate("/doctors")}
      >
        Voltar
      </button>
    </div>
  );
};

export default Availability;
