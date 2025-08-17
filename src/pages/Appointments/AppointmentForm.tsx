// src/pages/Appointments/AppointmentForm.tsx

import React, { useEffect, useState } from 'react';
import { AppointmentStatus, AppointmentFormState, Appointment } from '../../types/Appointment';
import styles from './AppointmentForm.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppointments } from '../../hooks/useAppointments';

const toLocalDateTimeInput = (iso: string) => {
  const d = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const fromLocalDateTimeInputToISO = (val: string) => new Date(val).toISOString();

const AppointmentForm: React.FC<{ mode: 'create' | 'edit' }> = ({ mode }) => {
  const { appointments, addAppointment, updateAppointment } = useAppointments();
  const [state, setState] = useState<AppointmentFormState>({
    patientId: 0,
    patientName: '',
    doctorId: 0,
    doctorName: '',
    appointmentDate: toLocalDateTimeInput(new Date().toISOString()),
    status: AppointmentStatus.Scheduled,
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const params = useParams();
  const idParam = params.id ? Number(params.id) : undefined;

  // Preenche formulário em modo de edição
  useEffect(() => {
    if (mode === 'edit' && idParam) {
      setLoading(true);
      const item = appointments.find(a => a.id === idParam);
      if (item) {
        setState({
          patientId: item.patientId,
          patientName: item.patientName ?? '',
          doctorId: item.doctorId,
          doctorName: item.doctorName ?? '',
          appointmentDate: toLocalDateTimeInput(item.appointmentDate),
          status: item.status,
          notes: item.notes ?? '',
        });
      }
      setLoading(false);
    }
  }, [mode, idParam, appointments]);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!state.patientId || state.patientId <= 0) e.patientId = 'Paciente é obrigatório';
    if (!state.doctorId || state.doctorId <= 0) e.doctorId = 'Médico é obrigatório';
    if (!state.appointmentDate) e.appointmentDate = 'Data e hora são obrigatórias';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    const payload: Omit<Appointment, 'id'> = {
      patientId: state.patientId,
      patientName: state.patientName,
      doctorId: state.doctorId,
      doctorName: state.doctorName,
      appointmentDate: fromLocalDateTimeInputToISO(state.appointmentDate),
      status: state.status,
      notes: state.notes,
    };

  if (mode === 'create') {
    addAppointment(payload);
  } else if (mode === 'edit' && idParam) {
    updateAppointment({ id: idParam, ...payload });
  }

    navigate('/appointments');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{mode === 'create' ? 'Nova Consulta' : 'Editar Consulta'}</h1>

      {loading ? <p>Carregando...</p> : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label>Paciente (ID)</label>
            <input
              type="number"
              value={state.patientId}
              onChange={e => setState(s => ({ ...s, patientId: Number(e.target.value) }))}
            />
            {errors.patientId && <div className={styles.error}>{errors.patientId}</div>}
          </div>

          <div className={styles.row}>
            <label>Nome do Paciente (opcional)</label>
            <input value={state.patientName} onChange={e => setState(s => ({ ...s, patientName: e.target.value }))} />
          </div>

          <div className={styles.row}>
            <label>Médico (ID)</label>
            <input
              type="number"
              value={state.doctorId}
              onChange={e => setState(s => ({ ...s, doctorId: Number(e.target.value) }))}
            />
            {errors.doctorId && <div className={styles.error}>{errors.doctorId}</div>}
          </div>

          <div className={styles.row}>
            <label>Nome do Médico (opcional)</label>
            <input value={state.doctorName} onChange={e => setState(s => ({ ...s, doctorName: e.target.value }))} />
          </div>

          <div className={styles.row}>
            <label>Data e Hora</label>
            <input
              type="datetime-local"
              value={state.appointmentDate}
              onChange={e => setState(s => ({ ...s, appointmentDate: e.target.value }))}
            />
            {errors.appointmentDate && <div className={styles.error}>{errors.appointmentDate}</div>}
          </div>

          <div className={styles.row}>
            <label>Status</label>
            <select value={state.status} onChange={e => setState(s => ({ ...s, status: Number(e.target.value) }))}>
              <option value={AppointmentStatus.Scheduled}>Agendada</option>
              <option value={AppointmentStatus.Confirmed}>Confirmada</option>
              <option value={AppointmentStatus.Cancelled}>Cancelada</option>
              <option value={AppointmentStatus.Completed}>Concluída</option>
            </select>
          </div>

          <div className={styles.row}>
            <label>Observações</label>
            <textarea value={state.notes} onChange={e => setState(s => ({ ...s, notes: e.target.value }))} />
          </div>

          <div className={styles.buttons}>
            <button type="submit" className={styles.saveBtn}>Salvar</button>
            <button type="button" className={styles.cancelBtn} onClick={() => navigate('/appointments')}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AppointmentForm;
