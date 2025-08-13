// src/pages/Patient/index.tsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Patient.module.css";

interface Patient {
  id: number;
  name: string;
  cpf: string;
  email: string;
  phone: string;
}

const PatientIndex: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Simula chamada à API (substituir pelo fetch real)
    const fetchPatients = async () => {
      const data: Patient[] = [
        { id: 1, name: "João da Silva", cpf: "111.111.111-11", email: "joao@email.com", phone: "9999-9999" },
        { id: 2, name: "Maria Souza", cpf: "222.222.222-22", email: "maria@email.com", phone: "8888-8888" }
      ];
      setPatients(data);
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((p) =>
    [p.name, p.cpf, p.email, p.phone].some((field) =>
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
          placeholder="Pesquisar por Nome, CPF, Email ou Telefone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.cpf}</td>
              <td>{patient.email}</td>
              <td>{patient.phone}</td>
              <td>
                <a href={`/patient/details/${patient.id}`} className={styles.detailsLink}>
                  Detalhes
                </a>{" "}
                <a href={`/patient/edit/${patient.id}`} className={styles.editLink}>
                  Editar
                </a>{" "}
                <a href={`/patient/delete/${patient.id}`} className={styles.deleteLink}>
                  Excluir
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientIndex;
