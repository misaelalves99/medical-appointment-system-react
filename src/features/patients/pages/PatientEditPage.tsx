// src/features/patients/pages/PatientEditPage.tsx

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PageContainer from '../../../shared/layout/PageContainer/PageContainer';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import { Card } from '../../../shared/ui/Card/Card';
import { LoadingSpinner } from '../../../shared/ui/Feedback/LoadingSpinner';
import { EmptyState } from '../../../shared/ui/Feedback/EmptyState';

import { usePatient } from '../../../hooks/usePatient';
import type { Patient } from '../../../domain/Patient';
import PatientForm, {
  type PatientFormValues,
} from '../components/PatientForm';

import styles from '../styles/Patient.module.css';

export default function PatientEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPatientById, updatePatient } = usePatient();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const existing = getPatientById(id);
    if (!existing) {
      setPatient(null);
      setLoading(false);
      return;
    }

    setPatient(existing);
    setLoading(false);
  }, [getPatientById, id]);

  async function handleSubmit(values: PatientFormValues) {
    if (!id) return;
    await updatePatient(id, values);
    navigate(`/patients/${id}`);
  }

  function handleCancel() {
    navigate('/patients');
  }

  if (loading) {
    return (
      <PageContainer>
        <div className={styles.centered}>
          <LoadingSpinner />
        </div>
      </PageContainer>
    );
  }

  if (!patient) {
    return (
      <PageContainer>
        <EmptyState
          title="Paciente não encontrado"
          description="Verifique se o link está correto ou volte para a lista de pacientes."
          primaryAction={{
            label: 'Voltar para pacientes',
            onClick: () => navigate('/patients'),
          }}
        />
      </PageContainer>
    );
  }

  const initialValues: PatientFormValues = {
    id: patient.id,
    name: patient.name ?? '',
    email: patient.email ?? '',
    phone: patient.phone ?? '',
    cpf: patient.cpf ?? '',
    birthDate: patient.birthDate ?? '',
    gender: patient.gender ?? 'OTHER',
    address: patient.address ?? '',
    notes: patient.notes ?? '',
    isActive: patient.isActive ?? true,
  };

  return (
    <PageContainer>
      <PageHeader
        title="Editar paciente"
        subtitle="Atualize os dados cadastrais do paciente mantendo o histórico organizado."
        breadcrumbItems={[
          { label: 'Dashboard', to: '/' },
          { label: 'Pacientes', to: '/patients' },
          { label: patient.name ?? 'Paciente', to: `/patients/${patient.id}` },
          { label: 'Editar' },
        ]}
      />

      <section className={styles.section}>
        <Card>
          <PatientForm
            mode="edit"
            initialValues={initialValues}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </Card>
      </section>
    </PageContainer>
  );
}
