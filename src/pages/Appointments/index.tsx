// src/pages/Appointments/index.tsx

import React, { useEffect, useState } from 'react';
import { appointmentsMock } from '../../mocks/appointments';
import { getAppointmentStatusLabel } from '../../utils/enumHelpers';
import styles from './AppointmentList.module.css';
import { Link, useNavigate } from 'react-router-dom';

const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState(appointmentsMock);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Simulação de carregamento
    setLoading(true);
    setTimeout(() => {
      setAppointments(appointmentsMock);
      setLoading(false);
    }, 300);
  }, []);

  const handleDelete = (id: number) => {
    if (!confirm('Confirma exclusão da consulta?')) return;
    const index = appointmentsMock.findIndex(a => a.id === id);
    if (index !== -1) {
      appointmentsMock.splice(index, 1); // Remove do mock
      setAppointments(prev => prev.filter(a => a.id !== id)); // Atualiza tela
    }
  };

  // Filtra os appointments pelo search: busca por pacienteId, doctorId e status
  const filteredAppointments = appointments.filter(a => {
    const searchLower = search.toLowerCase();
    const dateStr = new Date(a.appointmentDate).toLocaleDateString().toLowerCase();
    const timeStr = new Date(a.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();
    const patientStr = a.patientId ? `paciente id: ${a.patientId}` : "";
    const doctorStr = a.doctorId ? `médico id: ${a.doctorId}` : "";
    const statusStr = getAppointmentStatusLabel(a.status).toLowerCase();

    return (
      dateStr.includes(searchLower) ||
      timeStr.includes(searchLower) ||
      patientStr.includes(searchLower) ||
      doctorStr.includes(searchLower) ||
      statusStr.includes(searchLower)
    );
  });

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

      {loading ? (
        <p>Carregando...</p>
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
                    {dt.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td>{a.patientId ? `Paciente ID: ${a.patientId}` : '—'}</td>
                  <td>{a.doctorId ? `Médico ID: ${a.doctorId}` : '—'}</td>
                  <td>{getAppointmentStatusLabel(a.status)}</td>
                  <td>
                    <Link className={styles.link} to={`/appointments/${a.id}`}>
                      Detalhes
                    </Link>
                    <span className={styles.sep}>|</span>
                    <Link
                      className={styles.link}
                      to={`/appointments/edit/${a.id}`}
                    >
                      Editar
                    </Link>
                    <span className={styles.sep}>|</span>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(a.id)}
                    >
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
