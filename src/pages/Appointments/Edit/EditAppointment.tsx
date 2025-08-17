// src/pages/Appointment/Edit/EditAppointment.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EditAppointment.module.css";
import type { AppointmentForm } from "../../../types/AppointmentForm";
import { useAppointments } from "../../../hooks/useAppointments";
import { AppointmentStatus } from "../../../types/Appointment";

const EditAppointment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const appointmentId = Number(id);
  const navigate = useNavigate();
  const { appointments, updateAppointment } = useAppointments();

  const [formData, setFormData] = useState<AppointmentForm>({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    status: "",
    notes: ""
  });

  // Preenche o formulário com os dados da consulta
  useEffect(() => {
    const appointment = appointments.find(a => a.id === appointmentId);
    if (appointment) {
      setFormData({
        patientId: appointment.patientId.toString(),
        doctorId: appointment.doctorId.toString(),
        appointmentDate: appointment.appointmentDate.slice(0,16), // formato datetime-local
        status: AppointmentStatus[appointment.status],
        notes: appointment.notes || ""
      });
    }
  }, [appointmentId, appointments]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateAppointment({
      id: appointmentId,
      patientId: Number(formData.patientId),
      doctorId: Number(formData.doctorId),
      appointmentDate: new Date(formData.appointmentDate).toISOString(),
      status: (Object.keys(AppointmentStatus) as Array<keyof typeof AppointmentStatus>)
        .includes(formData.status as keyof typeof AppointmentStatus)
        ? AppointmentStatus[formData.status as keyof typeof AppointmentStatus]
        : AppointmentStatus.Scheduled,
      notes: formData.notes
    });

    navigate("/appointments");
  };

  return (
    <div className={styles.editAppointmentContainer}>
      <h1>Editar Consulta</h1>
      <form onSubmit={handleSubmit}>
        <label>Paciente</label>
        <input
          type="number"
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
        />

        <label>Médico</label>
        <input
          type="number"
          name="doctorId"
          value={formData.doctorId}
          onChange={handleChange}
        />

        <label>Data e Hora</label>
        <input
          type="datetime-local"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleChange}
        />

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Scheduled">Agendada</option>
          <option value="Confirmed">Confirmada</option>
          <option value="Cancelled">Cancelada</option>
          <option value="Completed">Concluída</option>
        </select>

        <label>Observações</label>
        <textarea
          name="notes"
          rows={4}
          value={formData.notes}
          onChange={handleChange}
        />

        <button type="submit">Salvar</button>
        <button type="button" className={styles.backLink} onClick={() => navigate("/appointments")}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditAppointment;
