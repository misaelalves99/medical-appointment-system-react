// src/features/dashboard/components/DashboardStatsGrid.tsx

import StatsCard from '../../../shared/components/StatsCard/StatsCard';
import styles from './DashboardStatsGrid.module.css';

type DashboardStatsGridProps = {
  totalPatients: number;
  totalDoctors: number;
  totalAppointmentsToday: number;
  totalUpcoming: number;
};

export default function DashboardStatsGrid({
  totalPatients,
  totalDoctors,
  totalAppointmentsToday,
  totalUpcoming,
}: DashboardStatsGridProps) {
  return (
    <section
      className={styles.grid}
      aria-label="Indicadores gerais da clínica"
    >
      <StatsCard
        label="Pacientes ativos"
        value={totalPatients}
        trendLabel="Total cadastrados"
        icon="users"
      />

      <StatsCard
        label="Médicos"
        value={totalDoctors}
        trendLabel="Profissionais vinculados"
        icon="stethoscope"
      />

      <StatsCard
        label="Consultas de hoje"
        value={totalAppointmentsToday}
        trendLabel="Agenda do dia"
        icon="calendar"
        tone="success"
      />

      <StatsCard
        label="Próximas consultas"
        value={totalUpcoming}
        trendLabel="Próximas 24h"
        icon="clock"
        tone="warning"
      />
    </section>
  );
}
