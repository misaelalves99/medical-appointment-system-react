// src/pages/Patient/Create/CreatePatient.tsx

// src/pages/Patient/Create/CreatePatient.tsx
import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePatient.module.css";
import type { PatientForm } from "../../../types/PatientForm";
import type { Patient } from "../../../types/Patient";
import { usePatient } from "../../../hooks/usePatient";

const CreatePatient: React.FC = () => {
  const { patients, addPatient } = usePatient();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<PatientForm>({
    name: "",
    cpf: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // ✅ ID sequencial simples
    const newId = patients.length + 1;

    const newPatient: Patient = { ...formData, id: newId };

    addPatient(newPatient);

    navigate("/patient");
  };

  return (
    <div className={styles.createPatientContainer}>
      <h1>Cadastrar Paciente</h1>

      <form onSubmit={handleSubmit}>
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
            required
          />
        </div>

        <button type="submit">Salvar</button>
        <button type="button" onClick={() => navigate("/patient")}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default CreatePatient;
