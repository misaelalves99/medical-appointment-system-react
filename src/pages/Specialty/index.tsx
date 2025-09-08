// src/pages/Specialty/index.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SpecialtyList.module.css";
import { useSpecialty } from "../../hooks/useSpecialty";

const SpecialtyList: React.FC = () => {
  const { specialties } = useSpecialty();
  const [filter, setFilter] = useState("");

  const filteredSpecialties = specialties
    .filter(
      (s) =>
        s.name.toLowerCase().includes(filter.toLowerCase()) ||
        s.id.toString().includes(filter)
    )
    .sort((a, b) => a.id - b.id); // 🔹 sempre ordenado por ID crescente

  return (
    <div className={styles.specialtyIndexContainer}>
      <h1>Especialidades</h1>

      <Link to="/specialty/create" className={styles.createLink}>
        Cadastrar Nova Especialidade
      </Link>

      <div>
        <input
          type="text"
          placeholder="Pesquisar por Nome ou ID..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.searchInput}
          aria-label="Pesquisar especialidades"
        />

        <table className={styles.specialtyTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredSpecialties.map((specialty) => (
              <tr key={specialty.id}>
                <td>{specialty.id}</td>
                <td>{specialty.name}</td>
                <td>
                  <Link
                    to={`/specialty/details/${specialty.id}`}
                    className={styles.detailsLink}
                  >
                    Detalhes
                  </Link>{" "}
                  <Link
                    to={`/specialty/edit/${specialty.id}`}
                    className={styles.detailsLink}
                  >
                    Editar
                  </Link>{" "}
                  <Link
                    to={`/specialty/delete/${specialty.id}`}
                    className={styles.detailsLink}
                  >
                    Excluir
                  </Link>
                </td>
              </tr>
            ))}
            {filteredSpecialties.length === 0 && (
              <tr>
                <td colSpan={3} style={{ textAlign: "center", padding: "1rem" }}>
                  Nenhuma especialidade encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpecialtyList;
