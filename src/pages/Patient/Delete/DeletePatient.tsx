// src/pages/Patient/Delete/DeletePatient.tsx

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DeletePatient.module.css";
import { usePatient } from "../../../hooks/usePatient";

const DeletePatient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { patients, deletePatient } = usePatient();

  if (!id) {
    return <p>Paciente não encontrado.</p>;
  }

  const patientId = Number(id);
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    return <p>Paciente não encontrado.</p>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    deletePatient(patient.id);
    navigate("/patient"); // Redireciona para a lista
  };

  return (
    <div className={styles.deletePatientContainer}>
      <h1>Confirmar Exclusão</h1>
      <p>
        Tem certeza de que deseja excluir o paciente{" "}
        <strong>{patient.name}</strong>?
      </p>

      <form onSubmit={handleSubmit}>
        <button type="submit" className={styles.btnDelete}>
          Excluir
        </button>
        <button
          type="button"
          className={styles.btnCancel}
          onClick={() => navigate("/patient")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default DeletePatient;
