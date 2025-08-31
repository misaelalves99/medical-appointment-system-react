// src/pages/Patient/Details/DetailsPatient.tsx

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DetailsPatient.module.css";
import { usePatient } from "../../../hooks/usePatient";

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("pt-BR");
};

const DetailsPatient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { patients } = usePatient();

  const patient = patients.find((p) => p.id === Number(id));

  if (!patient) {
    return (
      <div className={styles.patientDetailsContainer}>
        <h1>Detalhes do Paciente</h1>
        <p>Paciente não encontrado.</p>
        <button className={styles.back} onClick={() => navigate("/patient")}>
          Voltar para a Lista
        </button>
      </div>
    );
  }

  return (
    <div className={styles.patientDetailsContainer}>
      <h1>Detalhes do Paciente</h1>

      {patient.profilePicturePath && (
        <img
          src={patient.profilePicturePath}
          alt="Foto do Paciente"
          className={styles.profileImage}
        />
      )}

      <p>
        <strong>Nome:</strong> {patient.name}
      </p>
      <p>
        <strong>CPF:</strong> {patient.cpf || "-"}
      </p>
      <p>
        <strong>Data de Nascimento:</strong> {formatDate(patient.dateOfBirth)}
      </p>
      <p>
        <strong>Sexo:</strong> {patient.gender || "-"}
      </p>
      <p>
        <strong>Telefone:</strong> {patient.phone || "-"}
      </p>
      <p>
        <strong>Email:</strong> {patient.email || "-"}
      </p>
      <p>
        <strong>Endereço:</strong> {patient.address || "-"}
      </p>

      <div className={styles.actions}>
        <button
          className={styles.edit}
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
