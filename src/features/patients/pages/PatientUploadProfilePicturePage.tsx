// src/features/patients/pages/PatientUploadProfilePicturePage.tsx

import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PageContainer from '../../../shared/layout/PageContainer/PageContainer';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import { Card } from '../../../shared/ui/Card/Card';
import { Button } from '../../../shared/ui/Button/Button';
import { EmptyState } from '../../../shared/ui/Feedback/EmptyState';

import { usePatient } from '../../../hooks/usePatient';
import type { Patient } from '../../../domain/Patient';
import UploadProfilePictureForm from '../components/UploadProfilePictureForm';

import styles from '../styles/Patient.module.css';

export default function PatientUploadProfilePicturePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPatientById, updatePatientAvatar } = usePatient();

  const patient: Patient | null = useMemo(() => {
    if (!id) return null;
    const found = getPatientById(id);
    return found ?? null;
  }, [getPatientById, id]);

  async function handleSubmit(file: File) {
    if (!id) return;
    await updatePatientAvatar(id, file);
    navigate(`/patients/${id}`);
  }

  function handleCancel() {
    if (!id) {
      navigate('/patients');
      return;
    }
    navigate(`/patients/${id}`);
  }

  if (!patient) {
    return (
      <PageContainer>
        <EmptyState
          title="Paciente não encontrado"
          description="Verifique se o link está correto ou volte para a lista de pacientes."
          actions={
            <Button
              type="button"
              size="sm"
              onClick={() => navigate('/patients')}
            >
              Voltar para pacientes
            </Button>
          }
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Atualizar foto do paciente"
        subtitle="Envie uma nova foto para facilitar a identificação do paciente na agenda e nos atendimentos."
        breadcrumbItems={[
          { label: 'Dashboard', to: '/' },
          { label: 'Pacientes', to: '/patients' },
          { label: patient.name ?? 'Paciente', to: `/patients/${patient.id}` },
          { label: 'Atualizar foto' },
        ]}
      />

      <section className={styles.section}>
        <Card>
          <UploadProfilePictureForm
            currentImageUrl={patient.avatarUrl}
            patientName={patient.name}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </Card>
      </section>
    </PageContainer>
  );
}
