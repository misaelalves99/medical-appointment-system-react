// src/pages/Doctors/index.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DoctorList.module.css";
import { useDoctor } from "../../hooks/useDoctor";

export default function DoctorList() {
  const navigate = useNavigate();
  const { doctors } = useDoctor();
  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter((doctor) =>
    [doctor.id.toString(), doctor.name, doctor.crm, doctor.specialty, doctor.isActive ? "Sim" : "Não"]
      .some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div className={styles.container}>
      <h1>Lista de Médicos</h1>
      <div className={styles.actionsContainer}>
        <button
          className={styles.createButton}
          onClick={() => navigate("/doctors/create")}
        >
          Cadastrar Novo Médico
        </button>
        <input
          type="text"
          placeholder="Pesquisar por ID, Nome, CRM, Especialidade ou Status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CRM</th>
            <th>Especialidade</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.crm}</td>
              <td>{doctor.specialty}</td>
              <td>{doctor.isActive ? "Sim" : "Não"}</td>
              <td>
                <button
                  className={styles.detailsButton}
                  onClick={() => navigate(`/doctors/details/${doctor.id}`)}
                >
                  Detalhes
                </button>
                <button
                  className={styles.editButton}
                  onClick={() => navigate(`/doctors/edit/${doctor.id}`)}
                >
                  Editar
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => navigate(`/doctors/delete/${doctor.id}`)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {filteredDoctors.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                Nenhum médico encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
