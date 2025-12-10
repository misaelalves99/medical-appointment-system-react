// src/features/appointments/pages/AppointmentConfirmPage.tsx

import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PageContainer from '../../../shared/layout/PageContainer/PageContainer';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import { Card } from '../../../shared/ui/Card/Card';
import { Button } from '../../../shared/ui/Button/Button';
import { EmptyState } from '../../../shared/ui/Feedback/EmptyState';
import { LoadingSpinner } from '../../../shared/ui/Feedback/LoadingSpinner';

import AppointmentStatusBadge from '../components/AppointmentStatusBadge';

import { useAppointments } from '../../../hooks/useAppointments';
import { usePatient } from '../../../hooks/usePatient';
import { useDoctor } from '../../../hooks/useDoctor';

import { formatDateTimeShort } from '../../../utils/dateUtils';

import type { Appointment } from '../../../domain/Appointment';

import styles from '../styles/Appointment.module.css';

export default function AppointmentConfirmPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    appointments,
    getAppointmentById,
    confirmAppointment,
    loading,
  } = useAppointments();

  const { getPatientById } = usePatient();
  const { getDoctorById } = useDoctor();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) {
      setFetching(false);
      return;
    }

    setFetching(true);

    const found =
      (getAppointmentById && getAppointmentById(id)) ??
      appointments.find((a) => String(a.id) === String(id)) ??
      null;

    if (!found) {
      setNotFound(true);
      setAppointment(null);
    } else {
      setAppointment(found);
      setNotFound(false);
    }

    setFetching(false);
  }, [id, appointments, getAppointmentById]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!id || !appointment) return;

    try {
      setSubmitting(true);
      await confirmAppointment(id); // ✅ atualiza status para CONFIRMED
      // ✅ após confirmar, volta para a tabela de consultas
      navigate('/appointments');
    } finally {
      setSubmitting(false);
    }
  }

  if (fetching) {
    return (
      <PageContainer>
        <PageHeader
          title="Confirmar presença"
          subtitle="Carregando dados da consulta..."
          breadcrumbItems={[
            { label: 'Dashboard', to: '/' },
            { label: 'Consultas', to: '/appointments' },
          ]}
        />

        <section className={styles.section}>
          <Card>
            <div className={styles.centered}>
              <LoadingSpinner label="Buscando consulta..." />
            </div>
          </Card>
        </section>
      </PageContainer>
    );
  }

  if (notFound || !appointment) {
    return (
      <PageContainer>
        <PageHeader
          title="Consulta não encontrada"
          subtitle="Não foi possível localizar a consulta para confirmação."
          breadcrumbItems={[
            { label: 'Dashboard', to: '/' },
            { label: 'Consultas', to: '/appointments' },
          ]}
        />

        <section className={styles.section}>
          <Card>
            <EmptyState
              title="Nada para confirmar"
              description="Verifique se a consulta ainda existe ou se já foi removida."
              primaryAction={{
                label: 'Voltar para lista de consultas',
                onClick: () => navigate('/appointments'),
              }}
            />
          </Card>
        </section>
      </PageContainer>
    );
  }

  // 🔎 Resolve nome do paciente e médico a partir dos IDs
  const patient =
    appointment.patientId != null
      ? getPatientById(String(appointment.patientId))
      : undefined;

  const doctor =
    appointment.doctorId != null
      ? getDoctorById(String(appointment.doctorId))
      : undefined;

  const patientName = patient?.name ?? appointment.patientName ?? 'Paciente';
  const doctorName = doctor?.name ?? appointment.doctorName ?? '—';

  const canConfirm = appointment.status === 'SCHEDULED';

  if (!canConfirm) {
    return (
      <PageContainer>
        <PageHeader
          title="Não é possível confirmar"
          subtitle="Apenas consultas agendadas podem ser confirmadas."
          breadcrumbItems={[
            { label: 'Dashboard', to: '/' },
            { label: 'Consultas', to: '/appointments' },
            {
              label: `Consulta - ${patientName}`,
              to: `/appointments/details/${appointment.id}`,
            },
          ]}
        />

        <section className={styles.section}>
          <Card>
            <EmptyState
              title="Status não elegível para confirmação"
              description={`Status atual: ${appointment.status}. Atualize o status manualmente se necessário.`}
              primaryAction={{
                label: 'Voltar para lista de consultas',
                onClick: () => navigate('/appointments'),
              }}
            />
          </Card>
        </section>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title={`Confirmar presença - ${patientName}`}
        subtitle="Confirme a presença antecipadamente para organizar a agenda da equipe."
        breadcrumbItems={[
          { label: 'Dashboard', to: '/' },
          { label: 'Consultas', to: '/appointments' },
          {
            label: `Consulta - ${patientName}`,
            to: `/appointments/details/${appointment.id}`,
          },
          { label: 'Confirmar' },
        ]}
      />

      <section className={styles.section}>
        <Card>
          <form onSubmit={handleSubmit} className={styles.confirmForm}>
            <div className={styles.cancelHeader}>
              <div>
                <h2 className={styles.formTitle}>
                  Deseja confirmar esta consulta?
                </h2>
                <p className={styles.formSubtitle}>
                  A confirmação ajuda a equipe a ter uma visão real da agenda e
                  reduzir faltas.
                </p>
              </div>

              <div className={styles.cancelStatus}>
                <AppointmentStatusBadge status={appointment.status} />
              </div>
            </div>

            {/* Resumo com nomes resolvidos */}
            <div className={styles.cancelSummary}>
              <div>
                <span className={styles.detailsLabel}>Data e horário</span>
                <p className={styles.detailsStrong}>
                  {formatDateTimeShort(appointment.dateTime)}
                </p>
              </div>
              <div>
                <span className={styles.detailsLabel}>Paciente</span>
                <p className={styles.detailsStrong}>{patientName}</p>
              </div>
              <div>
                <span className={styles.detailsLabel}>Médico(a)</span>
                <p className={styles.detailsStrong}>Dr(a). {doctorName}</p>
              </div>
            </div>

            <div className={styles.formFooterActions}>
              {/* ✅ volta para tabela sem confirmar */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => navigate('/appointments')}
              >
                Voltar
              </Button>

              <Button
                type="submit"
                size="sm"
                disabled={submitting || loading}
              >
                {submitting || loading
                  ? 'Confirmando...'
                  : 'Confirmar consulta'}
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </PageContainer>
  );
}
