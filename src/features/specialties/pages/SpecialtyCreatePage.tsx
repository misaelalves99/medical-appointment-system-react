// src/features/specialties/pages/SpecialtyCreatePage.tsx

import { useNavigate } from 'react-router-dom';

import PageContainer from '../../../shared/layout/PageContainer/PageContainer';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import { Card } from '../../../shared/ui/Card/Card';

import { useSpecialty } from '../../../hooks/useSpecialty';
import SpecialtyForm, {
  type SpecialtyFormValues,
} from '../components/SpecialtyForm';

import styles from '../styles/Specialty.module.css';

export default function SpecialtyCreatePage() {
  const navigate = useNavigate();
  const { addSpecialty } = useSpecialty();

  const initialValues: SpecialtyFormValues = {
    name: '',
    description: '',
    isActive: true,
  };

  async function handleSubmit(values: SpecialtyFormValues) {
    await addSpecialty(values);
    navigate('/specialties');
  }

  function handleCancel() {
    navigate('/specialties');
  }

  return (
    <PageContainer>
      <PageHeader
        title="Nova especialidade"
        subtitle="Cadastre uma nova especialidade para organizar os atendimentos e filtros de agenda."
        breadcrumbItems={[
          { label: 'Dashboard', to: '/' },
          { label: 'Especialidades', to: '/specialties' },
          { label: 'Nova especialidade' },
        ]}
      />

      <section className={styles.section}>
        <Card>
          <SpecialtyForm
            mode="create"
            initialValues={initialValues}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </Card>
      </section>
    </PageContainer>
  );
}
