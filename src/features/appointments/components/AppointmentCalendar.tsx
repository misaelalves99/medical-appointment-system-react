// src/features/appointments/components/AppointmentCalendar.tsx

import { useMemo, useState } from 'react';
import type { Appointment } from '../../../domain/Appointment';
import AppointmentStatusBadge from './AppointmentStatusBadge';
import styles from '../styles/Appointment.module.css';

type AppointmentCalendarProps = {
  appointments: Appointment[];
  selectedDate: Date | null;
  onSelectedDateChange: (date: Date | null) => void;
};

type CalendarDay = {
  date: Date;
  hasAppointments: boolean;
  isToday: boolean;
  isSelected: boolean;
};

export default function AppointmentCalendar({
  appointments,
  selectedDate,
  onSelectedDateChange,
}: AppointmentCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    selectedDate ?? new Date(),
  );

  const days: CalendarDay[] = useMemo(() => {
    const end = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0,
    );

    const today = new Date();
    const todayStr = today.toDateString();
    const selectedStr = selectedDate ? selectedDate.toDateString() : null;

    const daysArray: CalendarDay[] = [];
    for (let day = 1; day <= end.getDate(); day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day,
      );
      const dateStr = date.toDateString();

      const hasAppointments = appointments.some((appointment) => {
        const aDate = new Date(appointment.dateTime);
        return aDate.toDateString() === dateStr;
      });

      daysArray.push({
        date,
        hasAppointments,
        isToday: dateStr === todayStr,
        isSelected: !!selectedStr && dateStr === selectedStr,
      });
    }

    return daysArray;
  }, [appointments, currentMonth, selectedDate]);

  const monthLabel = useMemo(
    () =>
      currentMonth.toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric',
      }),
    [currentMonth],
  );

  function handlePrevMonth() {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  }

  function handleNextMonth() {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  }

  function handleDayClick(day: CalendarDay) {
    onSelectedDateChange(day.date);
  }

  const selectedDayAppointments = useMemo(() => {
    if (!selectedDate) return [];

    const selectedStr = selectedDate.toDateString();

    return appointments
      .filter((appointment) => {
        const aDate = new Date(appointment.dateTime);
        return aDate.toDateString() === selectedStr;
      })
      .sort(
        (a, b) =>
          new Date(a.dateTime).getTime() -
          new Date(b.dateTime).getTime(),
      );
  }, [appointments, selectedDate]);

  return (
    <div className={styles.calendar}>
      <header className={styles.calendarHeader}>
        <button
          type="button"
          className={styles.calendarNavButton}
          onClick={handlePrevMonth}
        >
          &#8592;
        </button>

        <div className={styles.calendarMonthLabel}>{monthLabel}</div>

        <button
          type="button"
          className={styles.calendarNavButton}
          onClick={handleNextMonth}
        >
          &#8594;
        </button>
      </header>

      <div className={styles.calendarGrid}>
        <div className={styles.calendarWeekday}>D</div>
        <div className={styles.calendarWeekday}>S</div>
        <div className={styles.calendarWeekday}>T</div>
        <div className={styles.calendarWeekday}>Q</div>
        <div className={styles.calendarWeekday}>Q</div>
        <div className={styles.calendarWeekday}>S</div>
        <div className={styles.calendarWeekday}>S</div>

        {(() => {
          const firstWeekday = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            1,
          ).getDay();

          const blanks = Array.from({ length: firstWeekday }).map(
            (_, index) => (
              <div
                key={`blank-${index}`}
                className={styles.calendarDayBlank}
              />
            ),
          );

          const daysNodes = days.map((day) => (
            <button
              key={day.date.toISOString()}
              type="button"
              onClick={() => handleDayClick(day)}
              className={[
                styles.calendarDay,
                day.isToday ? styles.calendarDayToday : '',
                day.hasAppointments
                  ? styles.calendarDayWithAppointments
                  : '',
                day.isSelected ? styles.calendarDaySelected : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className={styles.calendarDayNumber}>
                {day.date.getDate()}
              </span>

              {day.hasAppointments && (
                <span className={styles.calendarDayDot} />
              )}
            </button>
          ));

          return [...blanks, ...daysNodes];
        })()}
      </div>

      <div className={styles.calendarSelectedList}>
        {selectedDayAppointments.length === 0 ? (
          <p className={styles.calendarSelectedEmpty}>
            Nenhuma consulta para o dia selecionado.
          </p>
        ) : (
          <ul className={styles.calendarSelectedItems}>
            {selectedDayAppointments.map((appointment) => (
              <li
                key={appointment.id}
                className={styles.calendarSelectedItem}
              >
                <div className={styles.calendarSelectedHeader}>
                  <span className={styles.calendarSelectedTime}>
                    {new Date(
                      appointment.dateTime,
                    ).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <AppointmentStatusBadge status={appointment.status} />
                </div>
                <p className={styles.calendarSelectedPatient}>
                  {appointment.patientName ?? 'Paciente'}
                </p>
                <p className={styles.calendarSelectedDoctor}>
                  Dr(a). {appointment.doctorName ?? '—'}
                </p>
                {appointment.specialtyName && (
                  <p className={styles.calendarSelectedSpecialty}>
                    {appointment.specialtyName}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
