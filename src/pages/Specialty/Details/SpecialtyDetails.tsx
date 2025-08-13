// src/pages/Specialty/Details/DetailsSpecialty.tsx

import React from "react";
import { Link } from "react-router-dom";
import styles from "./SpecialtyDetails.module.css";

interface SpecialtyDetailsProps {
  id: number;
  name: string;
}

const DetailsSpecialty: React.FC<SpecialtyDetailsProps> = ({ id, name }) => {
  return (
    <div className={styles.specialtyDetailsContainer}>
      <h1>Detalhes da Especialidade</h1>

      <p>
        <strong>ID:</strong> {id}
      </p>
      <p>
        <strong>Nome:</strong> {name}
      </p>

      <div className={styles.actions}>
        <Link to={`/specialty/edit/${id}`} className={styles.edit}>
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
