// src/features/appointments/pages/AppointmentDetailsPage.tsx

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PageContainer from '../../../shared/layout/PageContainer/PageContainer';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import { Card } from '../../../shared/ui/Card/Card';
import { Button } from '../../../shared/ui/Button/Button';
import { Badge } from '../../../shared/ui/Badge/Badge';
import { EmptyState } from '../../../shared/ui/Feedback/EmptyState';
import { LoadingSpinner } from '../../../shared/ui/Feedback/LoadingSpinner';

import AppointmentStatusBadge from '../components/AppointmentStatusBadge';

import { useAppointments } from '../../../hooks/useAppointments';
import { usePatient } from '../../../hooks/usePatient';
import { useDoctor } from '../../../hooks/useDoctor';

import { formatDateTimeShort } from '../../../utils/dateUtils';

import type { Appointment } from '../../../domain/Appointment';

import styles from '../styles/Appointment.module.css';

export default function AppointmentDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { appointments, getAppointmentById } = useAppointments();
  const { getPatientById } = usePatient();
  const { getDoctorById } = useDoctor();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [fetching, setFetching] = useState(true);

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

  if (fetching) {
    return (
      <PageContainer>
        <PageHeader
          title="Detalhes da consulta"
          subtitle="Carregando informações da consulta selecionada..."
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
          subtitle="Não encontramos a consulta informada. Verifique se o link ainda é válido."
          breadcrumbItems={[
            { label: 'Dashboard', to: '/' },
            { label: 'Consultas', to: '/appointments' },
          ]}
        />

        <section className={styles.section}>
          <Card>
            <EmptyState
              title="Nada por aqui"
              description="A consulta pode ter sido removida ou o identificador está incorreto."
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

  const canConfirm = appointment.status === 'SCHEDULED';
  const canCancel =
    appointment.status === 'SCHEDULED' ||
    appointment.status === 'CONFIRMED';

  return (
    <PageContainer>
      <PageHeader
        title={`Consulta - ${patientName}`}
        subtitle="Visão completa dos dados da consulta e paciente."
        breadcrumbItems={[
          { label: 'Dashboard', to: '/' },
          { label: 'Consultas', to: '/appointments' },
          {
            label: `Consulta - ${patientName}`,
            to: `/appointments/details/${appointment.id}`,
          },
        ]}
        actions={
          <div className={styles.headerActionsRow}>
            {canCancel && (
              <Button
                size="sm"
                variant="ghost"
                tone="danger"
                onClick={() =>
                  navigate(`/appointments/cancel/${appointment.id}`)
                }
              >
                Cancelar consulta
              </Button>
            )}

            {canConfirm && (
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  navigate(`/appointments/confirm/${appointment.id}`)
                }
              >
                Confirmar presença
              </Button>
            )}

            <Button
              size="sm"
              onClick={() =>
                navigate(`/appointments/edit/${appointment.id}`)
              }
            >
              Editar
            </Button>
          </div>
        }
      />

      <section className={styles.sectionGrid}>
        <Card>
          <div className={styles.detailsHeader}>
            <div>
              <span className={styles.detailsLabel}>Data e horário</span>
              <h2 className={styles.detailsTitle}>
                {formatDateTimeShort(appointment.dateTime)}
              </h2>
            </div>

            <div className={styles.detailsStatusRow}>
              <AppointmentStatusBadge status={appointment.status} />
              {appointment.specialtyName && (
                <Badge>{appointment.specialtyName}</Badge>
              )}
            </div>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailsColumn}>
              <h3 className={styles.detailsSectionTitle}>Paciente</h3>
              <dl className={styles.detailsList}>
                <div>
                  <dt>Nome</dt>
                  <dd>{patientName}</dd>
                </div>
                <div>
                  <dt>Código do paciente</dt>
                  <dd>#{appointment.patientId}</dd>
                </div>
              </dl>
            </div>

            <div className={styles.detailsColumn}>
              <h3 className={styles.detailsSectionTitle}>Profissional</h3>
              <dl className={styles.detailsList}>
                <div>
                  <dt>Médico(a)</dt>
                  <dd>Dr(a). {doctorName}</dd>
                </div>
                {appointment.room && (
                  <div>
                    <dt>Sala</dt>
                    <dd>{appointment.room}</dd>
                  </div>
                )}
              </dl>
            </div>

            <div className={styles.detailsColumn}>
              <h3 className={styles.detailsSectionTitle}>
                Informações da agenda
              </h3>
              <dl className={styles.detailsList}>
                <div>
                  <dt>Status</dt>
                  <dd>
                    <AppointmentStatusBadge status={appointment.status} />
                  </dd>
                </div>
                {appointment.createdAt && (
                  <div>
                    <dt>Agendada em</dt>
                    <dd>
                      {formatDateTimeShort(appointment.createdAt)}
                    </dd>
                  </div>
                )}
                {appointment.updatedAt && (
                  <div>
                    <dt>Última atualização</dt>
                    <dd>
                      {formatDateTimeShort(appointment.updatedAt)}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>

          <div className={styles.detailsNotesBlock}>
            <h3 className={styles.detailsSectionTitle}>Observações</h3>
            {appointment.notes ? (
              <p className={styles.detailsNotes}>{appointment.notes}</p>
            ) : (
              <p className={styles.detailsNotesEmpty}>
                Nenhuma observação registrada para esta consulta.
              </p>
            )}
          </div>
        </Card>

        <Card>
          <div className={styles.sideSection}>
            <h3 className={styles.detailsSectionTitle}>Ações rápidas</h3>
            <p className={styles.sideSectionText}>
              Use os atalhos abaixo para atualizar o status da consulta ou
              ajustar os dados.
            </p>
            <div className={styles.actionsStack}>
              {canConfirm && (
                <Button
                  fullWidth
                  size="sm"
                  onClick={() =>
                    navigate(`/appointments/confirm/${appointment.id}`)
                  }
                >
                  Confirmar presença
                </Button>
              )}

              {canCancel && (
                <Button
                  fullWidth
                  size="sm"
                  variant="outline"
                  tone="danger"
                  onClick={() =>
                    navigate(`/appointments/cancel/${appointment.id}`)
                  }
                >
                  Cancelar consulta
                </Button>
              )}

              <Button
                fullWidth
                size="sm"
                variant="ghost"
                onClick={() =>
                  navigate(`/appointments/edit/${appointment.id}`)
                }
              >
                Editar dados
              </Button>

              <Button
                fullWidth
                size="sm"
                variant="ghost"
                tone="neutral"
                onClick={() => navigate('/appointments')}
              >
                Voltar para lista
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </PageContainer>
  );
}
