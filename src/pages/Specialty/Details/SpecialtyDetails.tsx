// src/pages/Specialty/Details/SpecialtyDetails.tsx

import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./SpecialtyDetails.module.css";
import { useSpecialty } from "../../../hooks/useSpecialty";

const DetailsSpecialty: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { specialties } = useSpecialty();

  const specialty = specialties.find((s) => s.id === Number(id));

  if (!specialty) {
    return <p>Especialidade não encontrada.</p>;
  }

  return (
    <div className={styles.specialtyDetailsContainer}>
      <h1>Detalhes da Especialidade</h1>

      <p>
        <strong>ID:</strong> {specialty.id}
      </p>
      <p>
        <strong>Nome:</strong> {specialty.name}
      </p>

      <div className={styles.actions}>
        <Link to={`/specialty/edit/${specialty.id}`} className={styles.edit}>
          Editar
        </Link>
        <Link to="/specialty" className={styles.back}>
          Voltar para a Lista
        </Link>
      </div>
    </div>
  );
};

export default DetailsSpecialty;
