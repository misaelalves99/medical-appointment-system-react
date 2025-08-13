// src/pages/Patient/Details/DetailsPatient.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DetailsPatient.module.css";

interface PatientDetailsProps {
  patient: {
    id: number;
    name: string;
    dateOfBirth: string; // ISO date string
    gender: string;
    phone?: string;
    email?: string;
    // profilePicturePath?: string; // Uncomment if using photo
  };
}

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("pt-BR");
};

const DetailsPatient: React.FC<PatientDetailsProps> = ({ patient }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.patientDetailsContainer}>
      <h1>Detalhes do Paciente</h1>

      {/* Exemplo imagem se quiser usar */}
      {/* {patient.profilePicturePath && (
        <img
          src={patient.profilePicturePath}
          alt="Foto do Paciente"
          className={styles.profileImage}
        />
      )} */}

      <p>
        <strong>Nome:</strong> {patient.name}
      </p>
      <p>
        <strong>Data de Nascimento:</strong> {formatDate(patient.dateOfBirth)}
      </p>
      <p>
        <strong>Sexo:</strong> {patient.gender}
      </p>
      <p>
        <strong>Telefone:</strong> {patient.phone || "-"}
      </p>
      <p>
        <strong>Email:</strong> {patient.email || "-"}
      </p>

      <div className={styles.actions}>
        <button
          className={`${styles.edit}`}
          onClick={() => navigate(`/patient/edit/${patient.id}`)}
        >
          Editar
        </button>
        <button className={styles.back} onClick={() => navigate("/patient")}>
          Voltar para a Lista
        </button>
      </div>
    </div>
  );
};

export default DetailsPatient;
