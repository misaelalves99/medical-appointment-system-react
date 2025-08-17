// src/pages/Appointments/index.tsx

import React, { useState } from 'react';
import { getAppointmentStatusLabel } from '../../utils/enumHelpers';
import styles from './AppointmentList.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppointments } from '../../hooks/useAppointments';

const AppointmentList: React.FC = () => {
  const { appointments, deleteAppointment } = useAppointments();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Filtra os appointments pelo search: data, hora, paciente, médico ou status
  const filteredAppointments = appointments.filter(a => {
    const searchLower = search.toLowerCase();
    const dateStr = new Date(a.appointmentDate).toLocaleDateString().toLowerCase();
    const timeStr = new Date(a.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();
    const patientStr = a.patientId ? `paciente id: ${a.patientId}` : '';
    const doctorStr = a.doctorId ? `médico id: ${a.doctorId}` : '';
    const statusStr = getAppointmentStatusLabel(a.status).toLowerCase();

    return (
      dateStr.includes(searchLower) ||
      timeStr.includes(searchLower) ||
      patientStr.includes(searchLower) ||
      doctorStr.includes(searchLower) ||
      statusStr.includes(searchLower)
    );
  });

  const handleDelete = (id: number) => {
    if (!confirm('Confirma exclusão da consulta?')) return;
    deleteAppointment(id);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Consultas</h1>

      <div className={styles.actions}>
        <button
          className={styles.createBtn}
          onClick={() => navigate('/appointments/create')}
        >
          Nova Consulta
        </button>

        <input
          type="text"
          placeholder="Pesquisar por data, hora, paciente, médico ou status..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {appointments.length === 0 ? (
        <p>Nenhuma consulta cadastrada.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Hora</th>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(a => {
              const dt = new Date(a.appointmentDate);
              return (
                <tr key={a.id}>
                  <td>{dt.toLocaleDateString()}</td>
                  <td>
                    {dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td>{a.patientId ? `Paciente ID: ${a.patientId}` : '—'}</td>
                  <td>{a.doctorId ? `Médico ID: ${a.doctorId}` : '—'}</td>
                  <td>{getAppointmentStatusLabel(a.status)}</td>
                  <td>
                    <Link className={styles.link} to={`/appointments/${a.id}`}>
                      Detalhes
                    </Link>
                    <span className={styles.sep}>|</span>
                    <Link className={styles.link} to={`/appointments/edit/${a.id}`}>
                      Editar
                    </Link>
                    <span className={styles.sep}>|</span>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(a.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentList;
