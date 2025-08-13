// src/pages/Doctors/Details/DoctorDetails.tsx

import React from "react";
import styles from "./DoctorDetails.module.css";

export interface Doctor {
  id: number;
  name: string;
  crm: string;
  specialty: string;
  email: string;
  phone: string;
  isActive: boolean;
}

interface DoctorDetailsProps {
  doctor: Doctor;
  onEdit: (id: number) => void;
  onBack: () => void;
}

const DoctorDetails: React.FC<DoctorDetailsProps> = ({ doctor, onEdit, onBack }) => {
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
        <button className={styles.edit} onClick={() => onEdit(doctor.id)}>
          Editar
        </button>
        <button className={styles.back} onClick={onBack}>
          Voltar
        </button>
      </div>
    </div>
  );
};

export default DoctorDetails;
