// src/pages/Patient/PatientIndex.tsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Patient.module.css";
import { usePatient } from "../../hooks/usePatient";

const PatientIndex: React.FC = () => {
  const { patients } = usePatient();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredPatients = patients.filter((p) =>
    [p.id.toString(), p.name, p.cpf, p.phone ?? ""].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className={styles.patientIndexContainer}>
      <h1>Pacientes</h1>

      <div className={styles.actionsContainer}>
        <Link to="/patient/create" className={styles.createLink}>
          Cadastrar Novo Paciente
        </Link>

        <input
          type="text"
          placeholder="Pesquisar por ID, Nome, CPF ou Telefone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {filteredPatients.length === 0 ? (
        <p className={styles.noResults}>Nenhum paciente encontrado.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.cpf}</td>
                <td>{patient.phone || "-"}</td>
                <td className={styles.actionsColumn}>
                  <button
                    onClick={() => navigate(`/patient/details/${patient.id}`)}
                    className={styles.detailsLink}
                  >
                    Detalhes
                  </button>
                  <button
                    onClick={() => navigate(`/patient/edit/${patient.id}`)}
                    className={styles.editLink}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => navigate(`/patient/delete/${patient.id}`)}
                    className={styles.deleteLink}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientIndex;
