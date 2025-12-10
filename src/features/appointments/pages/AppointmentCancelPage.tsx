// src/features/appointments/pages/AppointmentCancelPage.tsx

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

export default function AppointmentCancelPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    appointments,
    getAppointmentById,
    cancelAppointment,
    loading,
  } = useAppointments();

  const { getPatientById } = usePatient();
  const { getDoctorById } = useDoctor();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [reason, setReason] = useState('');
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
      await cancelAppointment(id, reason || undefined); // ✅ ajusta status para CANCELLED + motivo
      // ✅ após cancelar, volta para a tabela de consultas
      navigate('/appointments');
    } finally {
      setSubmitting(false);
    }
  }

  if (fetching) {
    return (
      <PageContainer>
        <PageHeader
          title="Cancelar consulta"
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
          subtitle="Não foi possível localizar a consulta para cancelamento."
          breadcrumbItems={[
            { label: 'Dashboard', to: '/' },
            { label: 'Consultas', to: '/appointments' },
          ]}
        />

        <section className={styles.section}>
          <Card>
            <EmptyState
              title="Nada para cancelar"
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

  // 🔎 Resolve nomes reais do paciente e do médico
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

  const canCancel =
    appointment.status === 'SCHEDULED' ||
    appointment.status === 'CONFIRMED';

  if (!canCancel) {
    return (
      <PageContainer>
        <PageHeader
          title="Não é possível cancelar"
          subtitle="Apenas consultas agendadas ou confirmadas podem ser canceladas."
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
              title="Status não elegível para cancelamento"
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
        title={`Cancelar consulta - ${patientName}`}
        subtitle="Confirme o cancelamento e registre, se quiser, o motivo para histórico."
        breadcrumbItems={[
          { label: 'Dashboard', to: '/' },
          { label: 'Consultas', to: '/appointments' },
          {
            label: `Consulta - ${patientName}`,
            to: `/appointments/details/${appointment.id}`,
          },
          { label: 'Cancelar' },
        ]}
      />

      <section className={styles.section}>
        <Card>
          <form onSubmit={handleSubmit} className={styles.cancelForm}>
            <div className={styles.cancelHeader}>
              <div>
                <h2 className={styles.formTitle}>
                  Tem certeza que deseja cancelar esta consulta?
                </h2>
                <p className={styles.formSubtitle}>
                  O paciente poderá ser avisado do cancelamento pelo canal
                  oficial da clínica.
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

            <div className={styles.cancelReasonBlock}>
              <label
                className={styles.fieldLabel}
                htmlFor="cancel-reason"
              >
                Motivo do cancelamento{' '}
                <span className={styles.optionalLabel}>(opcional)</span>
              </label>
              <textarea
                id="cancel-reason"
                className={styles.textarea}
                placeholder="Ex.: Paciente ligou e solicitou remarcação, médico indisponível, ajuste de agenda..."
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <p className={styles.fieldHelper}>
                Esse motivo pode aparecer apenas para a equipe interna,
                ajudando a entender o histórico.
              </p>
            </div>

            <div className={styles.formFooterActions}>
              {/* ✅ volta para a tabela sem cancelar */}
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
                tone="danger"
                disabled={submitting || loading}
              >
                {submitting || loading
                  ? 'Cancelando...'
                  : 'Confirmar cancelamento'}
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </PageContainer>
  );
}
