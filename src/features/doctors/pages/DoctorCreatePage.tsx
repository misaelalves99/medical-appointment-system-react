// src/features/doctors/pages/DoctorCreatePage.tsx

import { useNavigate } from 'react-router-dom';

import { PageContainer } from '../../../shared/layout/PageContainer/PageContainer';
import { PageHeader } from '../../../shared/components/PageHeader/PageHeader';
import { Card } from '../../../shared/ui/Card/Card';

import { useDoctor } from '../../../hooks/useDoctor';
import DoctorForm, {
  type DoctorFormValues,
} from '../components/DoctorForm';

import styles from '../styles/Doctor.module.css';

export default function DoctorCreatePage() {
  const navigate = useNavigate();
  const { addDoctor } = useDoctor();

  const initialValues: DoctorFormValues = {
    name: '',
    email: '',
    phone: '',
    crm: '',
    specialtyId: '',
    bio: '',
    isActive: true,
  };

  async function handleSubmit(values: DoctorFormValues) {
    await addDoctor({
      name: values.name,
      crm: values.crm,
      specialtyId: values.specialtyId,
      phone: values.phone,
      email: values.email,
      bio: values.bio,
      isActive: values.isActive,
    });
    navigate('/doctors');
  }

  function handleCancel() {
    navigate('/doctors');
  }

  return (
    <PageContainer>
      <PageHeader
        title="Novo médico"
        description="Cadastre um novo profissional e vincule sua especialidade para organizar a agenda."
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Médicos', href: '/doctors' },
          { label: 'Novo médico' },
        ]}
      />

      <section className={styles.section}>
        <Card>
          <DoctorForm
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
