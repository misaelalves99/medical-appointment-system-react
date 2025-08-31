// src/pages/Specialty/Delete/DeleteSpecialty.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DeleteSpecialty.module.css";
import type { Specialty } from "../../../types/Specialty";
import { useSpecialty } from "../../../hooks/useSpecialty";

export default function DeleteSpecialty() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { specialties, removeSpecialty } = useSpecialty();
  const [specialty, setSpecialty] = useState<Specialty | null>(null);

  useEffect(() => {
    if (id) {
      const foundSpecialty = specialties.find(s => s.id === Number(id)) || null;
      setSpecialty(foundSpecialty);
    }
  }, [id, specialties]);

  function handleDelete() {
    if (specialty) {
      removeSpecialty(specialty.id);
      console.log("Especialidade excluída:", specialty);
      navigate("/specialty");
    }
  }

  if (!specialty) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Confirmar Exclusão</h1>
      <p>
        Tem certeza de que deseja excluir a especialidade{" "}
        <strong>{specialty.name}</strong>?
      </p>

      <button onClick={handleDelete} className={styles.deleteButton}>
        Excluir
      </button>
      <button onClick={() => navigate("/specialty")} className={styles.cancelButton}>
        Cancelar
      </button>
    </div>
  );
}
