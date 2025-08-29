// src/pages/Appointment/Edit/EditAppointment.tsx

// src/pages/Appointments/Edit/EditAppointment.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EditAppointment.module.css";
import type { AppointmentForm, Option } from "../../../types/AppointmentForm";
import { useAppointments } from "../../../hooks/useAppointments";
import { usePatient } from "../../../hooks/usePatient";
import { useDoctor } from "../../../hooks/useDoctor";
import { AppointmentStatus } from "../../../types/Appointment";

const EditAppointment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const appointmentId = Number(id);
  const navigate = useNavigate();

  const { appointments, updateAppointment } = useAppointments();
  const { patients } = usePatient();
  const { doctors } = useDoctor();

  const [formData, setFormData] = useState<AppointmentForm>({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    status: "",
    notes: "",
  });

  // Map para Option[]
  const patientOptions: Option[] = patients.map((p) => ({
    value: p.id.toString(),
    label: p.name,
  }));

  const doctorOptions: Option[] = doctors.map((d) => ({
    value: d.id.toString(),
    label: d.name,
  }));

  const statusOptions: Option[] = [
    { value: AppointmentStatus.Scheduled.toString(), label: "Agendada" },
    { value: AppointmentStatus.Confirmed.toString(), label: "Confirmada" },
    { value: AppointmentStatus.Cancelled.toString(), label: "Cancelada" },
    { value: AppointmentStatus.Completed.toString(), label: "Concluída" },
  ];

  // Preenche o formulário com os dados da consulta
  useEffect(() => {
    const appointment = appointments.find((a) => a.id === appointmentId);
    if (appointment) {
      setFormData({
        patientId: appointment.patientId.toString(),
        doctorId: appointment.doctorId.toString(),
        appointmentDate: appointment.appointmentDate.slice(0, 16), // datetime-local
        status: appointment.status.toString(),
        notes: appointment.notes || "",
      });
    }
  }, [appointmentId, appointments]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateAppointment({
      id: appointmentId,
      patientId: Number(formData.patientId),
      doctorId: Number(formData.doctorId),
      appointmentDate: new Date(formData.appointmentDate).toISOString(),
      status: Number(formData.status),
      notes: formData.notes,
    });

    navigate("/appointments");
  };

  return (
    <div className={styles.editAppointmentContainer}>
      <h1>Editar Consulta</h1>
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
            required
          >
            <option value="">-- Selecione o médico --</option>
            {doctorOptions.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
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

export default EditAppointment;
