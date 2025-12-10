// src/features/appointments/components/AppointmentFilters.tsx

import { Select } from '../../../shared/ui/Select/Select';
import { Input } from '../../../shared/ui/Input/Input';

import styles from '../styles/Appointment.module.css';

export type Option = {
  value: string;
  label: string;
};

type AppointmentFiltersProps = {
  statusFilter: string | 'ALL';
  onStatusFilterChange: (value: string | 'ALL') => void;

  // Filtro por médico (usado no calendário)
  doctorFilter?: string | 'ALL';
  onDoctorFilterChange?: (value: string | 'ALL') => void;
  doctorsOptions?: Option[];

  // Busca por texto (usado na lista)
  search?: string;
  onSearchChange?: (value: string) => void;
};

export default function AppointmentFilters({
  statusFilter,
  onStatusFilterChange,
  doctorFilter,
  onDoctorFilterChange,
  doctorsOptions,
  search,
  onSearchChange,
}: AppointmentFiltersProps) {
  return (
    <div className={styles.filtersRowInner}>
      <div className={styles.filtersGroup}>
        <label className={styles.filtersLabel} htmlFor="statusFilter">
          Status
        </label>
        <Select
          id="statusFilter"
          value={statusFilter}
          onChange={(event) =>
            onStatusFilterChange(event.target.value as 'ALL' | string)
          }
        >
          <option value="ALL">Todos</option>
          <option value="SCHEDULED">Agendadas</option>
          <option value="CONFIRMED">Confirmadas</option>
          <option value="COMPLETED">Realizadas</option>
          <option value="CANCELLED">Canceladas</option>
          <option value="NO_SHOW">Não compareceu</option>
        </Select>
      </div>

      {typeof doctorFilter !== 'undefined' &&
        typeof onDoctorFilterChange === 'function' && (
          <div className={styles.filtersGroup}>
            <label className={styles.filtersLabel} htmlFor="doctorFilter">
              Médico(a)
            </label>
            <Select
              id="doctorFilter"
              value={doctorFilter}
              onChange={(event) =>
                onDoctorFilterChange(
                  event.target.value as 'ALL' | string,
                )
              }
            >
              <option value="ALL">Todos</option>
              {doctorsOptions?.map((doctor) => (
                <option key={doctor.value} value={doctor.value}>
                  {doctor.label}
                </option>
              ))}
            </Select>
          </div>
        )}

      {typeof search !== 'undefined' &&
        typeof onSearchChange === 'function' && (
          <div className={styles.filtersGroup}>
            <label className={styles.filtersLabel} htmlFor="search">
              Busca
            </label>
            <Input
              id="search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por paciente, médico ou especialidade..."
            />
          </div>
        )}
    </div>
  );
}
