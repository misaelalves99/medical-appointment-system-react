// src/pages/Doctors/Edit/DoctorEdit.tsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DoctorEdit.module.css";
import type { Doctor } from "../../../types/Doctor";
import { useDoctor } from "../../../hooks/useDoctor";
import { useSpecialty } from "../../../hooks/useSpecialty"; // import do hook de especialidades

const DoctorEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { doctors, updateDoctor } = useDoctor();
  const { specialties } = useSpecialty(); // lista de especialidades cadastradas

  const [form, setForm] = useState<Doctor | null>(null);

  useEffect(() => {
    if (id) {
      const foundDoctor = doctors.find(d => d.id === Number(id)) || null;
      setForm(foundDoctor);
    }
  }, [id, doctors]);

  if (!form) {
    return <p>Carregando...</p>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let newValue: string | boolean = value;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      newValue = e.target.checked;
    }

    setForm(prev => ({
      ...prev!,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateDoctor(form);
    navigate("/doctors");
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
            required
          />
        </label>

        <label>
          CRM:
          <input
            type="text"
            name="crm"
            value={form.crm}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Especialidade:
          <select
            name="specialty"
            value={form.specialty}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma especialidade</option>
            {specialties.map(s => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Telefone:
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          Ativo
        </label>

        <button type="submit">Salvar Alterações</button>
        <button type="button" onClick={() => navigate("/doctors")}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default DoctorEdit;
