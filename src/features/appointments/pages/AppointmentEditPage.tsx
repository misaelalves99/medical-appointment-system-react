// src/features/appointments/pages/AppointmentEditPage.tsx

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PageContainer from '../../../shared/layout/PageContainer/PageContainer';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import { Card } from '../../../shared/ui/Card/Card';
import { Button } from '../../../shared/ui/Button/Button';
import { EmptyState } from '../../../shared/ui/Feedback/EmptyState';
import { LoadingSpinner } from '../../../shared/ui/Feedback/LoadingSpinner';

import AppointmentForm, {
  type AppointmentFormValues,
} from '../components/AppointmentForm';

import { useAppointments } from '../../../hooks/useAppointments';
import type { Appointment } from '../../../domain/Appointment';

import styles from '../styles/Appointment.module.css';

export default function AppointmentEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { appointments, getAppointmentById, updateAppointment, loading } =
    useAppointments();

  const [appointment, setAppointment] = useState<Appointment | null>(
    null,
  );
  const [notFound, setNotFound] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!id) return;
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

  async function handleSubmit(values: AppointmentFormValues) {
    if (!id) return;
    await updateAppointment(id, values);
    navigate(`/appointments/${id}`);
  }

  if (fetching) {
    return (
      <PageContainer>
        <PageHeader
          title="Editar consulta"
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
          subtitle="Não foi possível localizar a consulta solicitada. Verifique se o link está correto."
          breadcrumbItems={[
            { label: 'Dashboard', to: '/' },
            { label: 'Consultas', to: '/appointments' },
          ]}
        />

        <section className={styles.section}>
          <Card>
            <EmptyState
              title="Consulta inexistente"
              description="Talvez a consulta tenha sido removida ou o identificador esteja incorreto."
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

  const initialValues: AppointmentFormValues = {
    patientId: String(appointment.patientId),
    doctorId: String(appointment.doctorId),
    specialtyId: appointment.specialtyId
      ? String(appointment.specialtyId)
      : '',
    dateTime: appointment.dateTime,
    status: appointment.status,
    notes: appointment.notes ?? '',
  };

  return (
    <PageContainer>
      <PageHeader
        title="Editar consulta"
        subtitle="Atualize os dados da consulta já registrada na agenda."
        breadcrumbItems={[
          { label: 'Dashboard', to: '/' },
          { label: 'Consultas', to: '/appointments' },
          {
            label: `Consulta #${appointment.id}`,
            to: `/appointments/${appointment.id}`,
          },
          { label: 'Editar' },
        ]}
      />

      <section className={styles.section}>
        <Card>
          <div className={styles.formHeaderRow}>
            <div>
              <h2 className={styles.formTitle}>Informações da consulta</h2>
              <p className={styles.formSubtitle}>
                Ajuste paciente, médico, especialidade, data, horário ou
                status conforme necessidade.
              </p>
            </div>
            <div className={styles.formHeaderActions}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  navigate(`/appointments/`)
                }
              >
                Voltar
              </Button>
            </div>
          </div>

          <div className={styles.formWrapper}>
            <AppointmentForm
              mode="edit"
              initialValues={initialValues}
              onSubmit={handleSubmit}
              onCancel={() =>
                navigate(`/appointments/${appointment.id}`)
              }
              isSubmitting={loading}
            />
          </div>
        </Card>
      </section>
    </PageContainer>
  );
}
