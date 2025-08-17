// src/pages/Patient/History/HistoryPatient.tsx

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./HistoryPatient.module.css";
import type { PatientHistoryItem } from "../../../types/PatientHistory";
import { usePatient } from "../../../hooks/usePatient";

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("pt-BR");
};

const HistoryPatient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { patients } = usePatient();

  const patient = patients.find((p) => p.id === Number(id));

  if (!patient) {
    return (
      <div className={styles.patientHistoryContainer}>
        <h1>Histórico do Paciente</h1>
        <p>Paciente não encontrado.</p>
        <button className={styles.backLink} onClick={() => navigate("/patient")}>
          Voltar
        </button>
      </div>
    );
  }

  // Garantindo que o histórico exista
  const sortedHistory: PatientHistoryItem[] = [...(patient.history ?? [])].sort(
    (a, b) =>
      new Date(b.recordDate).getTime() - new Date(a.recordDate).getTime()
  );

  return (
    <div className={styles.patientHistoryContainer}>
      <h1>Histórico de {patient.name}</h1>

      {sortedHistory.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Notas</th>
            </tr>
          </thead>
          <tbody>
            {sortedHistory.map((item, idx) => (
              <tr key={idx}>
                <td>{formatDate(item.recordDate)}</td>
                <td>{item.description}</td>
                <td>{item.notes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum histórico registrado para este paciente.</p>
      )}

      <button className={styles.backLink} onClick={() => navigate("/patient")}>
        Voltar para a Lista
      </button>
    </div>
  );
};

export default HistoryPatient;
