// src/features/doctorAvailability/components/DoctorAvailabilityTable.tsx

import { Tag } from '../../../shared/ui/Tag/Tag';

import styles from '../pages/DoctorAvailabilityPage.module.css';

export type DoctorAvailabilityRow = {
  id: string;
  doctorName: string;
  specialtyName: string;
  dayOfWeek: string;
  dayOfWeekLabel: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  maxPatients: number | null;
};

type DoctorAvailabilityTableProps = {
  rows: DoctorAvailabilityRow[];
};

export default function DoctorAvailabilityTable({
  rows,
}: DoctorAvailabilityTableProps) {
  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Médico(a)</th>
              <th>Especialidade</th>
              <th>Dia</th>
              <th>Horário</th>
              <th>Capacidade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className={styles.tableRowHover}>
                <td>
                  <div className={styles.nameCell}>
                    <span className={styles.doctorName}>{row.doctorName}</span>
                  </div>
                </td>
                <td>
                  <span className={styles.tableSecondaryText}>
                    {row.specialtyName}
                  </span>
                </td>
                <td>
                  <span className={styles.dayPill}>{row.dayOfWeekLabel}</span>
                </td>
                <td>
                  <div className={styles.timeCell}>
                    <span className={styles.timeRange}>
                      {row.startTime} – {row.endTime}
                    </span>
                  </div>
                </td>
                <td>
                  <span className={styles.capacityText}>
                    {row.maxPatients != null
                      ? `Até ${row.maxPatients} paciente${
                          row.maxPatients === 1 ? '' : 's'
                        }`
                      : 'Sem limite definido'}
                  </span>
                </td>
                <td className={styles.statusCell}>
                  <Tag
                    tone={row.isAvailable ? 'success' : 'neutral'}
                    size="sm"
                  >
                    {row.isAvailable ? 'Disponível' : 'Indisponível'}
                  </Tag>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
