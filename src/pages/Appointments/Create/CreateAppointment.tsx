// src/pages/Appointments/Create/CreateAppointment.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateAppointment.module.css";
import type { AppointmentForm, Option } from "../../../types/AppointmentForm";
import { useAppointments } from "../../../hooks/useAppointments";
import { usePatient } from "../../../hooks/usePatient";
import { useDoctor } from "../../../hooks/useDoctor";

const CreateAppointment: React.FC = () => {
  const { patients } = usePatient();
  const { doctors } = useDoctor();
  const { addAppointment } = useAppointments();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<AppointmentForm>({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    status: "",
    notes: "",
  });

  const patientOptions: Option[] = patients.map((p) => ({
    value: p.id.toString(),
    label: p.name,
  }));

  const doctorOptions: Option[] = doctors.map((d) => ({
    value: d.id.toString(),
    label: d.name,
  }));

  const statusOptions: Option[] = [
    { value: "1", label: "Agendado" },
    { value: "2", label: "Confirmado" },
    { value: "3", label: "Cancelado" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Encontrar os nomes selecionados
    const patientName = patientOptions.find(p => p.value === formData.patientId)?.label || "";
    const doctorName = doctorOptions.find(d => d.value === formData.doctorId)?.label || "";

    addAppointment({
      patientId: Number(formData.patientId),
      doctorId: Number(formData.doctorId),
      patientName,  // salva o nome do paciente
      doctorName,   // salva o nome do médico
      appointmentDate: formData.appointmentDate,
      status: Number(formData.status),
      notes: formData.notes,
    });

    navigate("/appointments");
  };

  return (
    <div className={styles.createAppointmentContainer}>
      <h1>Nova Consulta</h1>
      <form onSubmit={handleSubmit}>
        {/* Paciente */}
        <div className="form-group">
          <label htmlFor="patientId">Paciente</label>
          <select
            id="patientId"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            required
          >
            <option value="">-- Selecione o paciente --</option>
            {patientOptions.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label} {/* Aqui mostra o nome */}
              </option>
            ))}
          </select>
        </div>

        {/* Médico */}
        <div className="form-group">
          <label htmlFor="doctorId">Médico</label>
          <select
            id="doctorId"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
          >
            <option value="">-- Selecione o médico --</option>
            {doctorOptions.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label} {/* Aqui mostra o nome */}
              </option>
            ))}
          </select>
        </div>

        {/* Data e hora */}
        <div className="form-group">
          <label htmlFor="appointmentDate">Data da Consulta</label>
          <input
            type="datetime-local"
            id="appointmentDate"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Status */}
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">-- Selecione o status --</option>
            {statusOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Observações */}
        <div className="form-group">
          <label htmlFor="notes">Observações</label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit">Salvar</button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/appointments")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAppointment;
