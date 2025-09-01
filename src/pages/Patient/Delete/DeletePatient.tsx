// src/pages/Patient/Delete/DeletePatient.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DeletePatient.module.css";
import type { Patient } from "../../../types/Patient";
import { usePatient } from "../../../hooks/usePatient";

export default function DeletePatient() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { patients, deletePatient } = usePatient();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      const foundPatient = patients.find(p => p.id === Number(id)) || null;
      setPatient(foundPatient);
    }
  }, [id, patients]);

  function handleDelete() {
    if (patient) {
      deletePatient(patient.id);
      console.log("Paciente excluído:", patient);
      navigate("/patient");
    }
  }

  if (!patient) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Confirmar Exclusão</h1>
      <p>
        Tem certeza de que deseja excluir o paciente{" "}
        <strong>{patient.name}</strong>?
      </p>

      <button onClick={handleDelete} className={styles.deleteButton}>
        Excluir
      </button>
      <button onClick={() => navigate("/patient")} className={styles.cancelButton}>
        Cancelar
      </button>
    </div>
  );
}
