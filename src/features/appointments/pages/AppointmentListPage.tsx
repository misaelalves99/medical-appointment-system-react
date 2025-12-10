// src/features/appointments/pages/AppointmentListPage.tsx

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageContainer from '../../../shared/layout/PageContainer/PageContainer';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import { DataTable } from '../../../shared/components/DataTable/DataTable';
import { Button } from '../../../shared/ui/Button/Button';
import { Badge } from '../../../shared/ui/Badge/Badge';
import AppointmentStatusBadge from '../components/AppointmentStatusBadge';
import AppointmentFilters from '../components/AppointmentFilters';

import { useAppointments } from '../../../hooks/useAppointments';
import { usePatient } from '../../../hooks/usePatient';
import { useDoctor } from '../../../hooks/useDoctor';

import { formatDateTimeShort } from '../../../utils/dateUtils';

import type { Appointment } from '../../../domain/Appointment';

import { FiEye, FiCheck, FiTrash2 } from 'react-icons/fi';

import styles from '../styles/Appointment.module.css';

type StatusFilter =
  | 'ALL'
  | 'SCHEDULED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW';

export default function AppointmentListPage() {
  const navigate = useNavigate();
  const { appointments, loading } = useAppointments();
  const { patients } = usePatient();
  const { doctors } = useDoctor();

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<'TODAY' | 'NEXT_7_DAYS' | 'ALL'>(
    'ALL',
  );

  function getPatientNameById(id?: string | number) {
    if (!id) return 'Paciente';
    const found = patients.find((p) => String(p.id) === String(id));
    return found?.name ?? 'Paciente';
  }

  function getDoctorNameById(id?: string | number) {
    if (!id) return '—';
    const found = doctors.find((d) => String(d.id) === String(id));
    return found?.name ?? '—';
  }

  const filteredAppointments = useMemo(() => {
    let result = [...appointments];

    if (statusFilter !== 'ALL') {
      result = result.filter((a) => a.status === statusFilter);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter((a) => {
        const patientName = getPatientNameById(a.patientId).toLowerCase();
        const doctorName = getDoctorNameById(a.doctorId).toLowerCase();
        const specialtyName = a.specialtyName?.toLowerCase() ?? '';
        return (
          patientName.includes(term) ||
          doctorName.includes(term) ||
          specialtyName.includes(term)
        );
      });
    }

    if (dateFilter !== 'ALL') {
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
      const next7DaysEnd = new Date(todayEnd);
      next7DaysEnd.setDate(next7DaysEnd.getDate() + 7);

      result = result.filter((a) => {
        const dt = new Date(a.dateTime);
        if (dateFilter === 'TODAY') {
          return dt >= todayStart && dt <= todayEnd;
        }
        if (dateFilter === 'NEXT_7_DAYS') {
          return dt >= todayStart && dt <= next7DaysEnd;
        }
        return true;
      });
    }

    result.sort(
      (a, b) =>
        new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime(),
    );

    return result;
  }, [appointments, statusFilter, searchTerm, dateFilter, patients, doctors]);

  const columns = [
    {
      key: 'dateTime',
      header: 'Data / Hora',
      render: (row: Appointment) => (
        <div className={styles.tableDateCol}>
          <span className={styles.tableDate}>
            {formatDateTimeShort(row.dateTime)}
          </span>
          {row.specialtyName && (
            <span className={styles.tableSpecialty}>{row.specialtyName}</span>
          )}
        </div>
      ),
    },
    {
      key: 'patientName',
      header: 'Paciente',
      render: (row: Appointment) => (
        <div className={styles.tableTextCol}>
          <span className={styles.tablePatient}>
            {getPatientNameById(row.patientId)}
          </span>
          {/* 👇 tirado o ID visível, só deixamos o nome na lista */}
        </div>
      ),
    },
    {
      key: 'doctorName',
      header: 'Médico(a)',
      render: (row: Appointment) => (
        <div className={styles.tableTextCol}>
          <span className={styles.tableDoctor}>
            Dr(a). {getDoctorNameById(row.doctorId)}
          </span>
          {row.room && (
            <span className={styles.tableSecondary}>Sala {row.room}</span>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center' as const,
      render: (row: Appointment) => (
        <AppointmentStatusBadge status={row.status} />
      ),
    },
    {
      key: 'actions',
      header: '',
      align: 'right' as const,
      render: (row: Appointment) => (
        <div className={styles.tableActions}>
          {/* Detalhes */}
          <button
            type="button"
            className={styles.tableActionButton}
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/appointments/details/${row.id}`);
            }}
          >
            <span className={styles.tableActionButtonIcon} aria-hidden="true">
              <FiEye />
            </span>
          </button>

          {/* Confirmar (somente se estiver agendada) */}
          {row.status === 'SCHEDULED' && (
            <button
              type="button"
              className={styles.tableActionButton}
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/appointments/confirm/${row.id}`);
              }}
            >
              <span
                className={styles.tableActionButtonIcon}
                aria-hidden="true"
              >
                <FiCheck />
              </span>
            </button>
          )}

          {/* Excluir */}
          <button
            type="button"
            className={`${styles.tableActionButton} ${styles.tableActionButtonDanger}`}
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/appointments/delete/${row.id}`);
            }}
          >
            <span className={styles.tableActionButtonIcon} aria-hidden="true">
              <FiTrash2 />
            </span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Consultas"
        subtitle="Gerencie a agenda de consultas da clínica, com filtros rápidos e status em tempo real."
        breadcrumbItems={[
          { label: 'Dashboard', to: '/' },
          { label: 'Consultas', to: '/appointments' },
        ]}
        actions={
          <Button size="sm" onClick={() => navigate('/appointments/create')}>
            Nova consulta
          </Button>
        }
      />

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderLeft}>
            <span className={styles.sectionHeaderLabel}>
              Filtros rápidos por período
            </span>
            <div className={styles.chipsRow}>
              <Badge
                onClick={() => setDateFilter('TODAY')}
                variant={dateFilter === 'TODAY' ? 'solid' : 'outline'}
              >
                Hoje
              </Badge>
              <Badge
                onClick={() => setDateFilter('NEXT_7_DAYS')}
                variant={dateFilter === 'NEXT_7_DAYS' ? 'solid' : 'outline'}
              >
                Próx. 7 dias
              </Badge>
              <Badge
                onClick={() => setDateFilter('ALL')}
                variant={dateFilter === 'ALL' ? 'solid' : 'outline'}
              >
                Todas
              </Badge>
            </div>
          </div>
        </div>

        <AppointmentFilters
          statusFilter={statusFilter}
          onStatusFilterChange={(value) =>
            setStatusFilter(value as StatusFilter)
          }
          search={searchTerm}
          onSearchChange={(value) => setSearchTerm(value)}
        />

        <div className={styles.tableWrapper}>
          <DataTable<Appointment>
            columns={columns}
            data={filteredAppointments}
            loading={loading}
            emptyMessage="Nenhuma consulta encontrada com os filtros selecionados."
            onRowClick={(row) =>
              navigate(`/appointments/details/${row.id}`)
            }
          />
        </div>
      </section>
    </PageContainer>
  );
}
