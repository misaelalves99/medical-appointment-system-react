// src/features/doctors/pages/DoctorEditPage.tsx

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PageContainer from '../../../shared/layout/PageContainer/PageContainer';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import { Card } from '../../../shared/ui/Card/Card';
import { LoadingSpinner } from '../../../shared/ui/Feedback/LoadingSpinner';
import { EmptyState } from '../../../shared/ui/Feedback/EmptyState';

import { useDoctor } from '../../../hooks/useDoctor';
import type { Doctor } from '../../../domain/Doctor';
import DoctorForm, {
  type DoctorFormValues,
} from '../components/DoctorForm';

import styles from '../styles/Doctor.module.css';

export default function DoctorEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getDoctorById, updateDoctor } = useDoctor();

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const existing = getDoctorById(id);
    if (!existing) {
      setDoctor(null);
      setLoading(false);
      return;
    }

    setDoctor(existing);
    setLoading(false);
  }, [getDoctorById, id]);

  async function handleSubmit(values: DoctorFormValues) {
    if (!id) return;
    await updateDoctor(id, values);
    navigate(`/doctors/${id}`);
  }

  function handleCancel() {
    navigate('/doctors');
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

  if (!doctor) {
    return (
      <PageContainer>
        <EmptyState
          title="Médico não encontrado"
          description="Verifique se o link está correto ou volte para a lista de médicos."
          primaryAction={{
            label: 'Voltar para médicos',
            onClick: () => navigate('/doctors'),
          }}
        />
      </PageContainer>
    );
  }

  const initialValues: DoctorFormValues = {
    id: doctor.id,
    name: doctor.name ?? '',
    email: doctor.email ?? '',
    phone: doctor.phone ?? '',
    crm: doctor.crm ?? '',
    specialtyId: doctor.specialtyId ? String(doctor.specialtyId) : '',
    bio: doctor.bio ?? '',
    isActive: doctor.isActive ?? true,
  };

  return (
    <PageContainer>
      <PageHeader
        title="Editar médico"
        subtitle="Atualize os dados do profissional, mantendo as informações alinhadas com a agenda."
        breadcrumbItems={[
          { label: 'Dashboard', to: '/' },
          { label: 'Médicos', to: '/doctors' },
          { label: doctor.name ?? 'Médico', to: `/doctors/${doctor.id}` },
          { label: 'Editar' },
        ]}
      />

      <section className={styles.section}>
        <Card>
          <DoctorForm
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
