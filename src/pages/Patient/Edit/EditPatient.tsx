// src/pages/Patient/Edit/EditPatient.tsx

import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EditPatient.module.css";

interface PatientEditForm {
  id: number;
  name: string;
  cpf: string;
  dateOfBirth: string; // ISO date string
  email: string;
  phone: string;
  address: string;
}

interface PatientEditProps {
  initialData: PatientEditForm;
  onSave: (data: PatientEditForm) => void;
}

const EditPatient: React.FC<PatientEditProps> = ({ initialData, onSave }) => {
  const [formData, setFormData] = useState<PatientEditForm>(initialData);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.editPatientContainer}>
      <h1>Editar Paciente</h1>

      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={formData.id} />

        <div>
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="cpf">CPF:</label>
          <input
            id="cpf"
            name="cpf"
            type="text"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="dateOfBirth">Data de Nascimento:</label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="phone">Telefone:</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="address">Endereço:</label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address || ""}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Salvar Alterações</button>
      </form>

      <button className={styles.back} onClick={() => navigate("/patient")}>
        Voltar
      </button>
    </div>
  );
};

export default EditPatient;
