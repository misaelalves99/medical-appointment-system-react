// src/pages/Patient/Edit/EditPatient.tsx

import React, { useState, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditPatient.module.css";
import type { PatientForm } from "../../../types/PatientForm";
import type { Patient } from "../../../types/Patient";
import { usePatient } from "../../../hooks/usePatient";

const EditPatient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { patients, updatePatient } = usePatient();

  const patientId = id ? Number(id) : null;
  const existingPatient = patientId
    ? patients.find((p) => p.id === patientId)
    : null;

  // Hook sempre chamado mesmo que o paciente não exista
  const [formData, setFormData] = useState<PatientForm>({
    id: existingPatient?.id,
    name: existingPatient?.name || "",
    cpf: existingPatient?.cpf || "",
    dateOfBirth: existingPatient?.dateOfBirth || "",
    email: existingPatient?.email || "",
    phone: existingPatient?.phone || "",
    address: existingPatient?.address || "",
    gender: existingPatient?.gender || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.id) return;

    const updatedPatient: Patient = {
      id: formData.id,
      name: formData.name,
      cpf: formData.cpf,
      dateOfBirth: formData.dateOfBirth,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      gender: formData.gender || undefined,
    };

    updatePatient(updatedPatient);
    navigate("/patient");
  };

  if (!existingPatient) {
    return (
      <div className={styles.editPatientContainer}>
        <h1>Editar Paciente</h1>
        <p>Paciente não encontrado.</p>
        <button className={styles.back} onClick={() => navigate("/patient")}>
          Voltar
        </button>
      </div>
    );
  }

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
          <label htmlFor="gender">Sexo:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div>
          <label htmlFor="phone">Telefone:</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="address">Endereço:</label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
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
