// src/pages/Appointments/index.tsx

import React, { useState } from 'react';
import { getAppointmentStatusLabel } from '../../utils/enumHelpers';
import styles from './AppointmentList.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppointments } from '../../hooks/useAppointments';

const AppointmentList: React.FC = () => {
  const { appointments } = useAppointments();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredAppointments = appointments.filter(a => {
    const searchLower = search.toLowerCase();
    const dt = new Date(a.appointmentDate);
    const dateStr = dt.toLocaleDateString().toLowerCase();
    const timeStr = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();
    const patientStr = a.patientName ? a.patientName.toLowerCase() : '';
    const statusStr = getAppointmentStatusLabel(a.status).toLowerCase();

    return (
      dateStr.includes(searchLower) ||
      timeStr.includes(searchLower) ||
      patientStr.includes(searchLower) ||
      statusStr.includes(searchLower) ||
      String(a.id).includes(searchLower)
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
          placeholder="Pesquisar por ID, data, hora, paciente ou status..."
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
              <th>ID</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Paciente</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(a => {
              const dt = new Date(a.appointmentDate);
              return (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{dt.toLocaleDateString()}</td>
                  <td>{dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  <td>{a.patientName || '—'}</td>
                  <td>{getAppointmentStatusLabel(a.status)}</td>
                  <td>
                    <Link className={styles.link} to={`/appointments/${a.id}`}>
                      Detalhes
                    </Link>
                    <Link className={styles.link} to={`/appointments/edit/${a.id}`}>
                      Editar
                    </Link>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => navigate(`/appointments/delete/${a.id}`)}
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
