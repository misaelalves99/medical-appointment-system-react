// src/features/appointments/pages/AppointmentCalendarPage.tsx

import { useMemo, useState } from 'react';

import PageContainer from '../../../shared/layout/PageContainer/PageContainer';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import { Card } from '../../../shared/ui/Card/Card';
import { EmptyState } from '../../../shared/ui/Feedback/EmptyState';
import { LoadingSpinner } from '../../../shared/ui/Feedback/LoadingSpinner';

import AppointmentFilters from '../components/AppointmentFilters';
import AppointmentCalendar from '../components/AppointmentCalendar';
import AppointmentStatusBadge from '../components/AppointmentStatusBadge';

import { useAppointments } from '../../../hooks/useAppointments';
import { isSameDay } from '../../../utils/dateUtils';

import type { Appointment } from '../../../domain/Appointment';

import styles from '../styles/Appointment.module.css';

export default function AppointmentCalendarPage() {
  const { appointments, loading } = useAppointments();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [statusFilter, setStatusFilter] = useState<string | 'ALL'>('ALL');
  const [doctorFilter, setDoctorFilter] = useState<string | 'ALL'>('ALL');

  const doctorsOptions = useMemo(() => {
    const names = Array.from(
      new Set(appointments.map((a) => a.doctorName).filter(Boolean)),
    )
      .map((name) => String(name))
      .sort();

    return names.map((name) => ({ value: name, label: name }));
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    let result: Appointment[] = [...appointments];

    if (selectedDate) {
      result = result.filter((a) => isSameDay(a.dateTime, selectedDate));
    }

    if (statusFilter !== 'ALL') {
      result = result.filter((a) => a.status === statusFilter);
    }

    if (doctorFilter !== 'ALL') {
      result = result.filter((a) => a.doctorName === doctorFilter);
    }

    return result;
  }, [appointments, selectedDate, statusFilter, doctorFilter]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Calendário de consultas"
        subtitle="Visualize a agenda da clínica por dia, com filtros por médico e status."
        breadcrumbItems={[
          { label: 'Dashboard', to: '/' },
          { label: 'Consultas', to: '/appointments' },
          { label: 'Calendário' },
        ]}
      />

      <section className={styles.section}>
        <Card>
          <div className={styles.filtersRow}>
            <AppointmentFilters
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              doctorFilter={doctorFilter}
              onDoctorFilterChange={setDoctorFilter}
              doctorsOptions={doctorsOptions}
            />
          </div>

          {loading ? (
            <div className={styles.centered}>
              <LoadingSpinner label="Carregando consultas da agenda..." />
            </div>
          ) : appointments.length === 0 ? (
            <EmptyState
              title="Nenhuma consulta cadastrada"
              description="Cadastre pelo menos uma consulta para visualizar no calendário."
            />
          ) : (
            <div className={styles.calendarWrapper}>
              <AppointmentCalendar
                appointments={appointments}
                selectedDate={selectedDate}
                onSelectedDateChange={handleDateChange}
              />

              <aside className={styles.calendarSidebar}>
                <h3 className={styles.detailsSectionTitle}>Resumo do dia</h3>

                {selectedDate ? (
                  <p className={styles.calendarDateLabel}>
                    {selectedDate.toLocaleDateString('pt-BR', {
                      weekday: 'long',
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </p>
                ) : (
                  <p className={styles.calendarDateLabel}>
                    Selecione um dia no calendário.
                  </p>
                )}

                {filteredAppointments.length === 0 ? (
                  <p className={styles.calendarEmptyDay}>
                    Não há consultas para os filtros selecionados neste dia.
                  </p>
                ) : (
                  <ul className={styles.calendarAppointmentsList}>
                    {filteredAppointments.map((appointment) => (
                      <li
                        key={appointment.id}
                        className={styles.calendarAppointmentItem}
                      >
                        <div className={styles.calendarAppointmentHeader}>
                          <span className={styles.calendarAppointmentTime}>
                            {new Date(
                              appointment.dateTime,
                            ).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          <AppointmentStatusBadge status={appointment.status} />
                        </div>
                        <p className={styles.calendarAppointmentPatient}>
                          {appointment.patientName ?? 'Paciente'}
                        </p>
                        <p className={styles.calendarAppointmentDoctor}>
                          Dr(a). {appointment.doctorName ?? '—'}
                        </p>
                        {appointment.specialtyName && (
                          <p className={styles.calendarAppointmentSpecialty}>
                            {appointment.specialtyName}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </aside>
            </div>
          )}
        </Card>
      </section>
    </PageContainer>
  );
}
