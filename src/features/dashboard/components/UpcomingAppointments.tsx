// src/features/dashboard/components/UpcomingAppointments.tsx

import styles from './UpcomingAppointments.module.css';

import { Card } from '../../../shared/ui/Card/Card';
import { EmptyState } from '../../../shared/ui/Feedback/EmptyState';
import { LoadingSpinner } from '../../../shared/ui/Feedback/LoadingSpinner';

import { useAppointments } from '../../../hooks/useAppointments';
import { formatDateTimeShort } from '../../../utils/dateUtils';
import AppointmentStatusBadge from '../../appointments/components/AppointmentStatusBadge';

export default function UpcomingAppointments() {
  const { appointments, loading } = useAppointments();

  const now = new Date();

  const upcoming = appointments
    .filter((a) => {
      const dt = new Date(a.dateTime);
      if (Number.isNaN(dt.getTime())) return false;
      return dt >= now;
    })
    .sort(
      (a, b) =>
        new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime(),
    )
    .slice(0, 6);

  if (loading) {
    return (
      <Card title="Próximas consultas">
        <div className={styles.body}>
          <LoadingSpinner label="Carregando agenda..." />
        </div>
      </Card>
    );
  }

  if (!upcoming.length) {
    return (
      <Card title="Próximas consultas">
        <div className={styles.body}>
          <EmptyState
            title="Nenhuma consulta futura"
            description="Cadastre novas consultas para ver a agenda do dia e das próximas horas aqui."
          />
        </div>
      </Card>
    );
  }

  return (
    <Card
      title="Próximas consultas"
      subtitle="Próximos horários agendados na clínica"
      footer={
        <span className={styles.footerHint}>
          Mostrando as 6 próximas consultas
        </span>
      }
    >
      <div
        className={styles.list}
        aria-label="Lista de próximas consultas"
      >
        {upcoming.map((appointment) => (
          <div key={appointment.id} className={styles.item}>
            <div className={styles.timeCol}>
              <span className={styles.time}>
                {formatDateTimeShort(appointment.dateTime)}
              </span>
              {appointment.specialtyName && (
                <span className={styles.specialty}>
                  {appointment.specialtyName}
                </span>
              )}
            </div>

            <div className={styles.infoCol}>
              <span className={styles.patient}>
                {appointment.patientName}
              </span>
              <span className={styles.doctor}>
                Dr(a). {appointment.doctorName}
              </span>
            </div>

            <div className={styles.statusCol}>
              <AppointmentStatusBadge status={appointment.status} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
