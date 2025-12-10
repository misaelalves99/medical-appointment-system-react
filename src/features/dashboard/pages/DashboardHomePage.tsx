// src/features/dashboard/pages/DashboardHomePage.tsx

import styles from './DashboardHomePage.module.css';

import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import DashboardStatsGrid from '../components/DashboardStatsGrid';
import UpcomingAppointments from '../components/UpcomingAppointments';

import { useAppointments } from '../../../hooks/useAppointments';
import { usePatient } from '../../../hooks/usePatient';
import { useDoctor } from '../../../hooks/useDoctor';

export default function DashboardHomePage() {
  const { appointments } = useAppointments();
  const { patients } = usePatient();
  const { doctors } = useDoctor();

  const totalPatients = patients.length;
  const totalDoctors = doctors.length;

  const now = new Date();
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0,
  );
  const todayEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999,
  );

  const next24hEnd = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const totalAppointmentsToday = appointments.filter((a) => {
    const dt = new Date(a.dateTime);
    if (Number.isNaN(dt.getTime())) return false;
    return dt >= todayStart && dt <= todayEnd;
  }).length;

  const totalUpcoming = appointments.filter((a) => {
    const dt = new Date(a.dateTime);
    if (Number.isNaN(dt.getTime())) return false;
    // próximas 24h (a partir de agora)
    return dt > now && dt <= next24hEnd;
  }).length;

  return (
    <>
      <PageHeader
        title="Visão geral da clínica"
        description="Acompanhe consultas do dia, pacientes ativos e o desempenho da agenda médica."
        breadcrumbs={[{ label: 'Dashboard', href: '/' }]}
      />

      <div className={styles.layout}>
        <section className={styles.leftColumn} aria-label="Indicadores principais da clínica">
          <DashboardStatsGrid
            totalPatients={totalPatients}
            totalDoctors={totalDoctors}
            totalAppointmentsToday={totalAppointmentsToday}
            totalUpcoming={totalUpcoming}
          />
        </section>

        <section className={styles.rightColumn} aria-label="Próximas consultas">
          <UpcomingAppointments />
        </section>
      </div>
    </>
  );
}
