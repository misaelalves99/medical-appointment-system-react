// src/features/patients/pages/PatientHistoryPage.tsx

import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PageContainer from '../../../shared/layout/PageContainer/PageContainer';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import { Card } from '../../../shared/ui/Card/Card';
import { EmptyState } from '../../../shared/ui/Feedback/EmptyState';

import { usePatient } from '../../../hooks/usePatient';
import type { Patient } from '../../../domain/Patient';
import { PatientHistoryTable } from '../components/PatientHistoryTable';

import styles from '../styles/Patient.module.css';

export default function PatientHistoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPatientById, getPatientHistory } = usePatient();

  const patient: Patient | null = useMemo(() => {
    if (!id) return null;
    const found = getPatientById(id);
    return found ?? null;
  }, [getPatientById, id]);

  if (!id || !patient) {
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

  const historyItems = getPatientHistory(id);

  return (
    <PageContainer>
      <PageHeader
        title={`Histórico de ${patient.name}`}
        subtitle="Acompanhe consultas, evoluções e registros relacionados a este paciente."
        breadcrumbItems={[
          { label: 'Dashboard', to: '/' },
          { label: 'Pacientes', to: '/patients' },
          { label: patient.name ?? 'Paciente', to: `/patients/${patient.id}` },
          { label: 'Histórico' },
        ]}
      />

      <section className={styles.section}>
        <Card>
          <PatientHistoryTable items={historyItems} />
        </Card>
      </section>
    </PageContainer>
  );
}
