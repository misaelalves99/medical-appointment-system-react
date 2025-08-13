// src/pages/Doctors/index.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DoctorList.module.css";
import { Doctor, doctorsMock } from "../../mocks/doctors";

export default function DoctorList() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Carrega diretamente do mock
    setDoctors(doctorsMock);
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    Object.values(doctor).some((value) =>
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
          placeholder="Pesquisar médicos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CRM</th>
            <th>Especialidade</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.name}</td>
              <td>{doctor.crm}</td>
              <td>{doctor.specialty}</td>
              <td>{doctor.email}</td>
              <td>{doctor.phone}</td>
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
        </tbody>
      </table>
    </div>
  );
}
