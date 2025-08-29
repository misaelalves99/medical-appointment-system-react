// src/pages/Doctors/Create/CreateDoctor.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateDoctor.module.css";
import type { Doctor } from "../../../types/Doctor";
import { useDoctor } from "../../../hooks/useDoctor";
import { useSpecialty } from "../../../hooks/useSpecialty"; // import do hook de especialidades

export default function CreateDoctor() {
  const navigate = useNavigate();
  const { doctors, addDoctor } = useDoctor();
  const { specialties } = useSpecialty(); // lista de especialidades cadastradas

  const [form, setForm] = useState<Doctor>({
    id: 0,
    name: "",
    crm: "",
    specialty: "",
    email: "",
    phone: "",
    isActive: false,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    let newValue: string | boolean = value;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      newValue = e.target.checked;
    }

    setForm(prev => ({
      ...prev,
      [name]: newValue,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Gera um novo ID sequencial simples
    const newId = doctors.length + 1;

    const newDoctor: Doctor = { ...form, id: newId };

    addDoctor(newDoctor);

    navigate("/doctors");
  }

  return (
    <div className={styles.container}>
      <h1>Cadastrar Médico</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            required
          />
        </div>

        <div>
          <label htmlFor="crm">CRM</label>
          <input
            id="crm"
            name="crm"
            value={form.crm}
            onChange={handleChange}
            type="text"
            required
          />
        </div>

        {/* Select de Especialidade */}
        <div>
          <label htmlFor="specialty">Especialidade</label>
          <select
            id="specialty"
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
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Telefone</label>
          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            type="tel"
            required
          />
        </div>

        <div>
          <label htmlFor="isActive">Ativo</label>
          <input
            id="isActive"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
            type="checkbox"
          />
        </div>

        <button type="submit">Salvar</button>
        <button type="button" onClick={() => navigate("/doctors")}>
          Cancelar
        </button>
      </form>
    </div>
  );
}
