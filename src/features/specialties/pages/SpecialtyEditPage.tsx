// src/features/specialties/pages/SpecialtyEditPage.tsx

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PageContainer from '../../../shared/layout/PageContainer/PageContainer';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import { Card } from '../../../shared/ui/Card/Card';
import { EmptyState } from '../../../shared/ui/Feedback/EmptyState';
import { LoadingSpinner } from '../../../shared/ui/Feedback/LoadingSpinner';
import { Button } from '../../../shared/ui/Button/Button';

import { useSpecialty } from '../../../hooks/useSpecialty';
import type { Specialty } from '../../../domain/Specialty';
import SpecialtyForm, {
  type SpecialtyFormValues,
} from '../components/SpecialtyForm';

import styles from '../styles/Specialty.module.css';

export default function SpecialtyEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSpecialtyById, updateSpecialty } = useSpecialty();

  const [specialty, setSpecialty] = useState<Specialty | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const existing = getSpecialtyById(id);
    if (!existing) {
      setSpecialty(null);
      setLoading(false);
      return;
    }

    setSpecialty(existing);
    setLoading(false);
  }, [getSpecialtyById, id]);

  async function handleSubmit(values: SpecialtyFormValues) {
    if (!id) return;
    await updateSpecialty(id, values);
    navigate(`/specialties/${id}`);
  }

  function handleCancel() {
    navigate('/specialties');
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

  if (!specialty) {
    return (
      <PageContainer>
        <EmptyState
          title="Especialidade não encontrada"
          description="Verifique se o link está correto ou volte para a lista de especialidades."
          actions={
            <Button
              type="button"
              size="sm"
              onClick={() => navigate('/specialties')}
            >
              Voltar para especialidades
            </Button>
          }
        />
      </PageContainer>
    );
  }

  const currentSpecialty = specialty;

  const initialValues: SpecialtyFormValues = {
    id: currentSpecialty.id,
    name: currentSpecialty.name ?? '',
    description: currentSpecialty.description ?? '',
    isActive: currentSpecialty.isActive ?? true,
  };

  return (
    <PageContainer>
      <PageHeader
        title="Editar especialidade"
        subtitle="Atualize o nome e a descrição da especialidade para refletir melhor os atendimentos da clínica."
        breadcrumbItems={[
          { label: 'Dashboard', to: '/' },
          { label: 'Especialidades', to: '/specialties' },
          {
            label: currentSpecialty.name ?? 'Especialidade',
            to: `/specialties/${currentSpecialty.id}`,
          },
          { label: 'Editar' },
        ]}
      />

      <section className={styles.section}>
        <Card>
          <SpecialtyForm
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
