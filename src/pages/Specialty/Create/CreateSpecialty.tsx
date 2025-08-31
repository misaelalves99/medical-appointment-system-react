// src/pages/Specialty/Create/CreateSpecialty.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateSpecialty.module.css";
import { useSpecialty } from "../../../hooks/useSpecialty";

const CreateSpecialty: React.FC = () => {
  const { addSpecialty } = useSpecialty();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addSpecialty(name.trim());
      setName("");
      navigate("/specialty"); // redireciona após criar
    }
  };

  return (
    <div className={styles.createSpecialtyContainer}>
      <h1>Cadastrar Nova Especialidade</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="specialtyName">Nome da Especialidade:</label>
          <input
            id="specialtyName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.actions}>
          <button type="submit">Salvar</button>
          <button
            type="button"
            className={styles.back}
            onClick={() => navigate("/specialty")}
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSpecialty;
