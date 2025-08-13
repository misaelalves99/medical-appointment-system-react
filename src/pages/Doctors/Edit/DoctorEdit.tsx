// src/pages/Doctors/Edit/DoctorEdit.tsx

import React, { useState } from "react";
import styles from "./DoctorEdit.module.css";
import { Doctor } from "../Details/DoctorDetails";

interface DoctorEditProps {
  doctor: Doctor;
  onSave: (updated: Doctor) => void;
  onCancel: () => void;
}

const DoctorEdit: React.FC<DoctorEditProps> = ({ doctor, onSave, onCancel }) => {
  const [form, setForm] = useState<Doctor>(doctor);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let newValue: string | boolean = value;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      newValue = e.target.checked;
    }

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className={styles.container}>
      <h1>Editar Médico</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </label>

        <label>
          CRM:
          <input
            type="text"
            name="crm"
            value={form.crm}
            onChange={handleChange}
          />
        </label>

        <label>
          Especialidade:
          <input
            type="text"
            name="specialty"
            value={form.specialty}
            onChange={handleChange}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Telefone:
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </label>

        <label className={styles.checkboxLabel}>
          Ativo:
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Salvar Alterações</button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default DoctorEdit;