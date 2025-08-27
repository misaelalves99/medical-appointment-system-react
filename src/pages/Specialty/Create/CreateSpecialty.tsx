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
      navigate("/specialty"); // redireciona para a página de listagem após criar
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
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default CreateSpecialty;
