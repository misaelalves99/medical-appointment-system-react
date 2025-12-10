// src/features/patients/pages/PatientDeletePage.tsx

import { useNavigate, useParams } from 'react-router-dom';

import PageContainer from '../../../shared/layout/PageContainer/PageContainer';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import { Card } from '../../../shared/ui/Card/Card';
import { Button } from '../../../shared/ui/Button/Button';
import { Tag } from '../../../shared/ui/Tag/Tag';
import { EmptyState } from '../../../shared/ui/Feedback/EmptyState';

import { usePatient } from '../../../hooks/usePatient';
import { formatCpf } from '../../../utils/formatters';

import styles from '../styles/Patient.module.css';

export default function PatientDeletePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPatientById, deletePatient } = usePatient();

  const patient = id ? getPatientById(id) ?? null : null;

  async function handleConfirm() {
    if (!id) return;

    await deletePatient(id);
    navigate('/patients'); // ✅ lista de pacientes
  }

  function handleCancel() {
    if (!id) {
      navigate('/patients'); // ✅ volta para lista se não tiver id
      return;
    }
    // ✅ detalhes do paciente (rota correta: /patients/details/:id)
    navigate(`/patients/details/${id}`);
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
        title="Excluir paciente"
        subtitle="Confirme a exclusão definitiva do cadastro do paciente."
        breadcrumbItems={[
          { label: 'Dashboard', to: '/' },
          { label: 'Pacientes', to: '/patients' },
          {
            label: patient.name ?? 'Paciente',
            // ✅ breadcrumb aponta para a ficha do paciente
            to: `/patients/details/${patient.id}`,
          },
          { label: 'Excluir' },
        ]}
      />

      <section className={styles.section}>
        <Card>
          <div className={styles.deleteHeader}>
            <div className={styles.deleteHeaderLeft}>
              <h2 className={styles.deleteTitle}>
                Tem certeza que deseja excluir este paciente?
              </h2>
              <p className={styles.deleteSubtitle}>
                Essa ação é permanente e não poderá ser desfeita. Os registros
                relacionados podem perder o vínculo com este cadastro.
              </p>
            </div>
            <div className={styles.deleteHeaderRight}>
              <Tag
                label="Exclusão permanente"
                color="red"
                variant="filled"
                size="sm"
              />
            </div>
          </div>

          <div className={styles.deleteSummary}>
            <div className={styles.detailsRow}>
              <span className={styles.detailsLabel}>Paciente</span>
              <span className={styles.detailsStrong}>
                {patient.name ?? '—'}
              </span>
            </div>
            <div className={styles.detailsRow}>
              <span className={styles.detailsLabel}>CPF</span>
              <span className={styles.detailsValue}>
                {patient.cpf ? formatCpf(patient.cpf) : '—'}
              </span>
            </div>
            <div className={styles.detailsRow}>
              <span className={styles.detailsLabel}>E-mail</span>
              <span className={styles.detailsValue}>
                {patient.email ?? '—'}
              </span>
            </div>
          </div>

          <div className={styles.deleteFooter}>
            <div className={styles.detailsActionsLeft}>
              <p className={styles.detailsHint}>
                Se não tiver certeza, volte para os detalhes do paciente e
                revise as informações.
              </p>
            </div>
            <div className={styles.detailsActionsRight}>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                variant="solid"
                size="sm"
                onClick={handleConfirm}
              >
                Sim, excluir paciente
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </PageContainer>
  );
}
