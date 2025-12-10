// src/features/appointments/pages/AppointmentDeletePage.tsx

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

export default function AppointmentDeletePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { appointments, getAppointmentById, deleteAppointment, loading } =
    useAppointments();
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

    const candidate = getAppointmentById
      ? getAppointmentById(id)
      : appointments.find((a) => String(a.id) === String(id));

    const found: Appointment | null = candidate ?? null;

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
      await deleteAppointment(id);
      navigate('/appointments'); // ✅ volta para lista
    } finally {
      setSubmitting(false);
    }
  }

  if (fetching) {
    return (
      <PageContainer>
        <PageHeader
          title="Excluir consulta"
          description="Carregando dados da consulta..."
          breadcrumbs={[
            { label: 'Dashboard', href: '/' },
            { label: 'Consultas', href: '/appointments' },
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
          description="Não foi possível localizar a consulta para exclusão."
          breadcrumbs={[
            { label: 'Dashboard', href: '/' },
            { label: 'Consultas', href: '/appointments' },
          ]}
        />

        <section className={styles.section}>
          <Card>
            <EmptyState
              title="Nada para excluir"
              description="Verifique se a consulta já foi removida ou se o link está correto."
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

  // 🔎 Resolve nome do paciente e do médico a partir dos IDs
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

  return (
    <PageContainer>
      <PageHeader
        title={`Excluir consulta - ${patientName}`}
        description="Essa ação é permanente. A consulta será removida do histórico da agenda."
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Consultas', href: '/appointments' },
          {
            label: `Consulta - ${patientName}`,
            href: `/appointments/details/${appointment.id}`, // ✅ rota correta de detalhes
          },
          {
            label: 'Excluir',
            href: `/appointments/delete/${appointment.id}`, // ✅ rota correta de exclusão
          },
        ]}
      />

      <section className={styles.section}>
        <Card>
          <form onSubmit={handleSubmit} className={styles.deleteForm}>
            <div className={styles.cancelHeader}>
              <div>
                <h2 className={styles.formTitle}>
                  Deseja realmente excluir esta consulta?
                </h2>
                <p className={styles.formSubtitle}>
                  Essa operação não pode ser desfeita. Use com cuidado para não
                  perder histórico importante.
                </p>
              </div>

              <div className={styles.cancelStatus}>
                <AppointmentStatusBadge status={appointment.status} />
              </div>
            </div>

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
              <Button
                type="button"
                variant="ghost"
                size="sm"
                // ✅ volta para detalhes da consulta
                onClick={() =>
                  navigate(`/appointments/`)
                }
              >
                Voltar
              </Button>

              <Button
                type="submit"
                size="sm"
                tone="danger"
                variant="solid"
                disabled={submitting || loading}
              >
                {submitting || loading ? 'Excluindo...' : 'Excluir consulta'}
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </PageContainer>
  );
}
