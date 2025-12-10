// src/features/appointments/pages/AppointmentCreatePage.tsx

import { useNavigate } from 'react-router-dom';

import PageContainer from '../../../shared/layout/PageContainer/PageContainer';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import { Card } from '../../../shared/ui/Card/Card';
import { Button } from '../../../shared/ui/Button/Button';

import AppointmentForm, {
  type AppointmentFormValues,
} from '../components/AppointmentForm';

import { useAppointments } from '../../../hooks/useAppointments';

import styles from '../styles/Appointment.module.css';

export default function AppointmentCreatePage() {
  const navigate = useNavigate();
  const { createAppointment, loading } = useAppointments();

  const initialValues: AppointmentFormValues = {
    patientId: '',
    doctorId: '',
    specialtyId: '',
    dateTime: '',
    status: 'SCHEDULED',
    notes: '',
  };

  async function handleSubmit(values: AppointmentFormValues) {
    // cria a consulta e já navega para os detalhes dela
    const created = await createAppointment(values);
    navigate(`/appointments/details/${created.id}`);
  }

  function handleCancel() {
    navigate('/appointments');
  }

  return (
    <PageContainer>
      <PageHeader
        title="Nova consulta"
        subtitle="Cadastre uma nova consulta vinculando paciente, médico, especialidade e horário."
        breadcrumbItems={[
          { label: 'Dashboard', to: '/' },
          { label: 'Consultas', to: '/appointments' },
          { label: 'Nova consulta' },
        ]}
      />

      <section className={styles.section}>
        <Card>
          <div className={styles.formHeaderRow}>
            <div>
              <h2 className={styles.formTitle}>Informações da consulta</h2>
              <p className={styles.formSubtitle}>
                Preencha os dados principais para registrar a consulta na agenda.
              </p>
            </div>
            <div className={styles.formHeaderActions}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </div>
          </div>

          <div className={styles.formWrapper}>
            <AppointmentForm
              mode="create"
              initialValues={initialValues}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isSubmitting={loading}
            />
          </div>
        </Card>
      </section>
    </PageContainer>
  );
}
