// src/pages/Appointments/index.tsx

import React, { useMemo, useState } from 'react';
import { getAppointmentStatusLabel } from '../../utils/enumHelpers';
import styles from './AppointmentList.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAppointments } from '../../hooks/useAppointments';
import { usePatient } from '../../hooks/usePatient';
import { useDoctor } from '../../hooks/useDoctor';
import type { Appointment } from '../../types/Appointment';

type AppointmentView = Appointment & {
  patientNameResolved: string;
  doctorNameResolved: string;
};

const AppointmentList: React.FC = () => {
  const { appointments } = useAppointments();
  const { patients } = usePatient();
  const { doctors } = useDoctor();

  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Junta (join) para resolver nomes a partir dos IDs
  const viewAppointments: AppointmentView[] = useMemo(() => {
    return appointments.map(a => {
      const p = patients.find(p => p.id === a.patientId);
      const d = doctors.find(d => d.id === a.doctorId);
      return {
        ...a,
        patientNameResolved: p?.name ?? `ID ${a.patientId}`,
        doctorNameResolved: d?.name ?? `ID ${a.doctorId}`,
      };
    });
  }, [appointments, patients, doctors]);

  // Filtro usando os nomes resolvidos (não os campos salvos no appointment)
  const filteredAppointments = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return viewAppointments;

    return viewAppointments.filter(a => {
      const dt = new Date(a.appointmentDate);
      const dateStr = dt.toLocaleDateString().toLowerCase();
      const timeStr = dt
        .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        .toLowerCase();
      const patientStr = a.patientNameResolved.toLowerCase();
      const doctorStr = a.doctorNameResolved.toLowerCase();
      const statusStr = getAppointmentStatusLabel(a.status).toLowerCase();
      const idStr = String(a.id).toLowerCase();

      return (
        dateStr.includes(s) ||
        timeStr.includes(s) ||
        patientStr.includes(s) ||
        doctorStr.includes(s) ||
        statusStr.includes(s) ||
        idStr.includes(s)
      );
    });
  }, [search, viewAppointments]);

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
          placeholder="Pesquisar por ID, data, hora, paciente, médico ou status..."
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
                  <td>{a.id}</td>
                  <td>{dt.toLocaleDateString()}</td>
                  <td>
                    {dt.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td>{a.patientNameResolved}</td>
                  <td>{a.doctorNameResolved}</td>
                  <td>{getAppointmentStatusLabel(a.status)}</td>
                  <td>
                    <Link className={styles.link} to={`/appointments/${a.id}`}>
                      Detalhes
                    </Link>
                    <Link
                      className={styles.link}
                      to={`/appointments/edit/${a.id}`}
                    >
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
