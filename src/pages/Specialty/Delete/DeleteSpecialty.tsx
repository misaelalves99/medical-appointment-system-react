// src/pages/Specialty/Delete/DeleteSpecialty.tsx

import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./DeleteSpecialty.module.css";
import { useSpecialty } from "../../../hooks/useSpecialty";

const DeleteSpecialty: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { specialties, removeSpecialty } = useSpecialty();

  const specialty = specialties.find((s) => s.id === Number(id));

  if (!specialty) {
    return <p>Especialidade não encontrada.</p>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    removeSpecialty(specialty.id);
    navigate("/specialty");
  };

  return (
    <div className={styles.deleteSpecialtyContainer}>
      <h1>Excluir Especialidade</h1>
      <h4>Tem certeza que deseja excluir esta especialidade?</h4>
      <div>
        <strong>ID:</strong> {specialty.id}
        <br />
        <strong>Nome:</strong> {specialty.name}
      </div>

      <form onSubmit={handleSubmit}>
        <button type="submit">Excluir</button>
        <Link to="/specialty" className={styles.cancelLink}>
          Cancelar
        </Link>
      </form>
    </div>
  );
};

export default DeleteSpecialty;
