// src/features/patients/pages/PatientCreatePage.tsx

import { useNavigate } from 'react-router-dom';

import PageContainer from '../../../shared/layout/PageContainer/PageContainer';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import { Card } from '../../../shared/ui/Card/Card';

import { usePatient } from '../../../hooks/usePatient';
import PatientForm, {
  type PatientFormValues,
} from '../components/PatientForm';

import styles from '../styles/Patient.module.css';

export default function PatientCreatePage() {
  const navigate = useNavigate();
  const { addPatient } = usePatient();

  const initialValues: PatientFormValues = {
    name: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: '',
    gender: 'OTHER',
    address: '',
    notes: '',
    isActive: true,
  };

  async function handleSubmit(values: PatientFormValues) {
    await addPatient(values);
    navigate('/patients');
  }

  function handleCancel() {
    navigate('/patients');
  }

  return (
    <PageContainer>
      <PageHeader
        title="Novo paciente"
        subtitle="Cadastre um novo paciente para organizar a agenda e o prontuário na clínica."
        breadcrumbItems={[
          { label: 'Dashboard', to: '/' },
          { label: 'Pacientes', to: '/patients' },
          { label: 'Novo paciente' },
        ]}
      />

      <section className={styles.section}>
        <Card>
          <PatientForm
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
