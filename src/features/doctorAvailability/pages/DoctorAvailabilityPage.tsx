// src/features/doctorAvailability/pages/DoctorAvailabilityPage.tsx

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageContainer from '../../../shared/layout/PageContainer/PageContainer';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import { Card } from '../../../shared/ui/Card/Card';
import { Select } from '../../../shared/ui/Select/Select';
import { Input } from '../../../shared/ui/Input/Input';
import { EmptyState } from '../../../shared/ui/Feedback/EmptyState';
import { LoadingSpinner } from '../../../shared/ui/Feedback/LoadingSpinner';
import { Button } from '../../../shared/ui/Button/Button';

import { useDoctor } from '../../../hooks/useDoctor';
import type { Doctor } from '../../../domain/Doctor';
import type { DoctorAvailability } from '../../../domain/DoctorAvailability';

import DoctorAvailabilityTable, {
  type DoctorAvailabilityRow,
} from '../components/DoctorAvailabilityTable';

import styles from './DoctorAvailabilityPage.module.css';

const DAYS_OF_WEEK = [
  { value: 'all', label: 'Todos os dias' },
  { value: 'monday', label: 'Segunda-feira' },
  { value: 'tuesday', label: 'Terça-feira' },
  { value: 'wednesday', label: 'Quarta-feira' },
  { value: 'thursday', label: 'Quinta-feira' },
  { value: 'friday', label: 'Sexta-feira' },
  { value: 'saturday', label: 'Sábado' },
  { value: 'sunday', label: 'Domingo' },
];

function getDayLabel(day: string | undefined): string {
  switch ((day ?? '').toLowerCase()) {
    case 'monday':
      return 'Segunda';
    case 'tuesday':
      return 'Terça';
    case 'wednesday':
      return 'Quarta';
    case 'thursday':
      return 'Quinta';
    case 'friday':
      return 'Sexta';
    case 'saturday':
      return 'Sábado';
    case 'sunday':
      return 'Domingo';
    default:
      return '—';
  }
}

export default function DoctorAvailabilityPage() {
  const navigate = useNavigate();
  const { doctors, isLoading } = useDoctor();

  const [searchTerm, setSearchTerm] = useState('');
  const [dayFilter, setDayFilter] = useState('all');

  const rows: DoctorAvailabilityRow[] = useMemo(() => {
    const result: DoctorAvailabilityRow[] = [];

    doctors.forEach((doctor: Doctor) => {
      const availabilityList =
        (doctor as unknown as { availability?: DoctorAvailability[] }).availability ?? [];

      availabilityList.forEach((slot) => {
        const maxPatients =
          (slot as unknown as { maxPatients?: number | null }).maxPatients ?? null;

        result.push({
          id: `${doctor.id}-${slot.id ?? `${slot.dayOfWeek}-${slot.startTime}`}`,
          doctorName: doctor.name ?? 'Médico(a)',
          specialtyName:
            (doctor as unknown as { specialtyName?: string }).specialtyName ?? 'Especialidade',
          dayOfWeek: slot.dayOfWeek ?? '',
          dayOfWeekLabel: getDayLabel(slot.dayOfWeek),
          startTime: slot.startTime ?? '',
          endTime: slot.endTime ?? '',
          isAvailable: slot.isAvailable ?? true,
          maxPatients,
        });
      });
    });

    return result;
  }, [doctors]);

  const filteredRows = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesDay =
        dayFilter === 'all' ||
        row.dayOfWeek.toLowerCase() === dayFilter.toLowerCase();

      const matchesSearch =
        !term ||
        row.doctorName.toLowerCase().includes(term) ||
        row.specialtyName.toLowerCase().includes(term);

      return matchesDay && matchesSearch;
    });
  }, [rows, dayFilter, searchTerm]);

  function handleGoToDoctors() {
    navigate('/doctors');
  }

  return (
    <PageContainer>
      <PageHeader
        title="Disponibilidade dos médicos"
        subtitle="Visualize e filtre os horários de atendimento dos médicos para manter a agenda sempre organizada."
        breadcrumbItems={[
          { label: 'Dashboard', to: '/' },
          { label: 'Disponibilidade dos médicos' },
        ]}
        actions={
          <Button size="sm" onClick={handleGoToDoctors}>
            Gerenciar médicos
          </Button>
        }
      />

      <section className={styles.section}>
        <Card>
          <div className={styles.filtersRow}>
            <div className={styles.filtersLeft}>
              <h2 className={styles.sectionTitle}>Agenda por médico</h2>
              <p className={styles.sectionSubtitle}>
                Combine filtros por dia da semana e médico para entender como está distribuída a
                carga de atendimentos.
              </p>
            </div>

            <div className={styles.filtersRight}>
              <div className={styles.filterItem}>
                <label className={styles.filterLabel}>Buscar médico ou especialidade</label>
                <Input
                  placeholder="Ex.: Ana, João, Cardiologia..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>

              <div className={styles.filterItem}>
                <label className={styles.filterLabel}>Dia da semana</label>
                <Select
                  value={dayFilter}
                  onChange={(event) => setDayFilter(event.target.value)}
                >
                  {DAYS_OF_WEEK.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className={styles.centered}>
              <LoadingSpinner />
            </div>
          ) : !rows.length ? (
            <EmptyState
              title="Nenhuma disponibilidade cadastrada"
              description="Cadastre horários nos médicos para visualizar a agenda consolidada por dia da semana."
              primaryAction={{
                label: 'Ir para médicos',
                onClick: handleGoToDoctors,
              }}
            />
          ) : !filteredRows.length ? (
            <EmptyState
              title="Nenhum horário encontrado"
              description="Ajuste os filtros de dia da semana ou busca de médico para visualizar outros horários."
            />
          ) : (
            <DoctorAvailabilityTable rows={filteredRows} />
          )}
        </Card>
      </section>
    </PageContainer>
  );
}
