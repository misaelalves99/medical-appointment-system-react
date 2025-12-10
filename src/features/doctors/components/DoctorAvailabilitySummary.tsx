// src/features/doctors/components/DoctorAvailabilitySummary.tsx

import type { DoctorAvailability } from '../../../domain/DoctorAvailability';

import { Tag } from '../../../shared/ui/Tag/Tag';

import styles from '../styles/Doctor.module.css';

type DoctorAvailabilitySummaryProps = {
  availability: DoctorAvailability[];
};

const WEEK_DAY_LABEL: Record<string, string> = {
  MONDAY: 'Segunda',
  TUESDAY: 'Terça',
  WEDNESDAY: 'Quarta',
  THURSDAY: 'Quinta',
  FRIDAY: 'Sexta',
  SATURDAY: 'Sábado',
  SUNDAY: 'Domingo',
};

export default function DoctorAvailabilitySummary({
  availability,
}: DoctorAvailabilitySummaryProps) {
  if (!availability || availability.length === 0) {
    return (
      <div className={styles.availabilityEmpty}>
        <h3 className={styles.detailsBlockTitle}>Disponibilidade</h3>
        <p className={styles.availabilityEmptyText}>
          Nenhuma disponibilidade configurada para este médico ainda. Defina os horários na tela de agenda.
        </p>
      </div>
    );
  }

  const groupedByDay = availability.reduce<
    Record<string, { startTime: string; endTime: string }[]>
  >((acc, slot) => {
    const day = slot.dayOfWeek ?? 'UNKNOWN';
    if (!acc[day]) acc[day] = [];
    acc[day].push({
      startTime: slot.startTime ?? '',
      endTime: slot.endTime ?? '',
    });
    return acc;
  }, {});

  return (
    <div className={styles.availabilityCard}>
      <div className={styles.availabilityHeader}>
        <h3 className={styles.detailsBlockTitle}>Disponibilidade</h3>
        <Tag tone="neutral" size="sm">
          Agenda configurada
        </Tag>
      </div>

      <div className={styles.availabilityGrid}>
        {Object.entries(groupedByDay).map(([dayOfWeek, slots]) => (
          <div key={dayOfWeek} className={styles.availabilityDayBlock}>
            <div className={styles.availabilityDayHeader}>
              <span className={styles.availabilityDayLabel}>
                {WEEK_DAY_LABEL[dayOfWeek] ?? dayOfWeek}
              </span>
            </div>
            <div className={styles.availabilitySlots}>
              {slots.map((slot, index) => (
                <div
                  key={`${dayOfWeek}-${index}`}
                  className={styles.availabilitySlotPill}
                >
                  {slot.startTime} - {slot.endTime}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className={styles.availabilityHint}>
        Ajuste os horários exatos e dias de atendimento pela tela de{' '}
        <strong>Agenda do médico</strong>.
      </p>
    </div>
  );
}
