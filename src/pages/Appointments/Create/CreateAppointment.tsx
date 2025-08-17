// src/pages/Appointments/Create/CreateAppointment.tsx

import React, { useState } from "react";
import styles from "./CreateAppointment.module.css";
import type { AppointmentForm, Option } from "../../../types/AppointmentForm";
import { useNavigate } from "react-router-dom";
import { useAppointments } from "../../../hooks/useAppointments";

interface CreateAppointmentProps {
  patients: Option[];
  doctors: Option[];
  statusOptions: Option[];
}

const CreateAppointment: React.FC<CreateAppointmentProps> = ({
  patients,
  doctors,
  statusOptions,
}) => {
  const [formData, setFormData] = useState<AppointmentForm>({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    status: "",
    notes: "",
  });

  const { addAppointment } = useAppointments();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // Conversão de tipos
  const payload = {
    patientId: Number(formData.patientId),
    patientName: "", // opcional, você pode adicionar input se quiser
    doctorId: Number(formData.doctorId),
    doctorName: "", // opcional
    appointmentDate: formData.appointmentDate,
    status: Number(formData.status), // assume que statusOptions.value é number compatível com AppointmentStatus
    notes: formData.notes,
  };

  addAppointment(payload);
  navigate("/appointments"); // Volta para a lista após criar
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
          >
            <option value="">-- Selecione o paciente --</option>
            {patients.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
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
          >
            <option value="">-- Selecione o médico --</option>
            {doctors.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        {/* Data */}
        <div className="form-group">
          <label htmlFor="appointmentDate">Data da Consulta</label>
          <input
            type="datetime-local"
            id="appointmentDate"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
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

        {/* Botões */}
        <div className="form-actions">
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => navigate("/appointments")} className="btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAppointment;
