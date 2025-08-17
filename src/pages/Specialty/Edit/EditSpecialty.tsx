// src/pages/Specialty/Edit/EditSpecialty.tsx

import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./EditSpecialty.module.css";
import { useSpecialty } from "../../../hooks/useSpecialty";

const EditSpecialty: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { specialties, updateSpecialty } = useSpecialty();

  const specialty = specialties.find((s) => s.id === Number(id));

  const [name, setName] = useState(specialty?.name || "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (specialty) setName(specialty.name);
  }, [specialty]);

  if (!specialty) return <p>Especialidade não encontrada.</p>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "") {
      setError("O nome da especialidade é obrigatório.");
      return;
    }
    setError(null);
    updateSpecialty(specialty.id, name.trim());
    navigate("/specialty");
  };

  return (
    <div className={styles.editSpecialtyContainer}>
      <h1>Editar Especialidade</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="specialtyName">Nome da Especialidade:</label>
          <input
            id="specialtyName"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {error && <span className={styles.textDanger}>{error}</span>}
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Salvar Alterações
        </button>
      </form>

      <Link to="/specialty" className="btn btn-secondary mt-3">
        Voltar
      </Link>
    </div>
  );
};

export default EditSpecialty;
