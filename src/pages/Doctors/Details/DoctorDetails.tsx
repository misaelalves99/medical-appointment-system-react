// src/pages/Doctors/Details/DoctorDetails.tsx

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DoctorDetails.module.css";
import type { Doctor } from "../../../types/Doctor";
import { useDoctor } from "../../../hooks/useDoctor";

const DoctorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { doctors } = useDoctor();
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    if (id) {
      const foundDoctor = doctors.find(d => d.id === Number(id)) || null;
      setDoctor(foundDoctor);
    }
  }, [id, doctors]);

  if (!doctor) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Detalhes do Médico</h1>

      <p><strong>Nome:</strong> {doctor.name}</p>
      <p><strong>CRM:</strong> {doctor.crm}</p>
      <p><strong>Especialidade:</strong> {doctor.specialty}</p>
      <p><strong>Email:</strong> {doctor.email}</p>
      <p><strong>Telefone:</strong> {doctor.phone}</p>
      <p><strong>Ativo:</strong> {doctor.isActive ? "Sim" : "Não"}</p>

      <div className={styles.actions}>
        <button className={styles.edit} onClick={() => navigate(`/doctors/edit/${doctor.id}`)}>
          Editar
        </button>
        <button className={styles.back} onClick={() => navigate("/doctors")}>
          Voltar
        </button>
      </div>
    </div>
  );
};

export default DoctorDetails;
