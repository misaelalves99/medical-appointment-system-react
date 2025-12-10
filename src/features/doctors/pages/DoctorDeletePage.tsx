// src/features/doctors/pages/DoctorDeletePage.tsx

import { useNavigate, useParams } from 'react-router-dom';

import { PageContainer } from '../../../shared/layout/PageContainer/PageContainer';
import { PageHeader } from '../../../shared/components/PageHeader/PageHeader';
import { Card } from '../../../shared/ui/Card/Card';
import { Button } from '../../../shared/ui/Button/Button';
import { Tag } from '../../../shared/ui/Tag/Tag';
import { EmptyState } from '../../../shared/ui/Feedback/EmptyState';

import { useDoctor } from '../../../hooks/useDoctor';
import type { Doctor } from '../../../domain/Doctor';

import styles from '../styles/Doctor.module.css';

export default function DoctorDeletePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getDoctorById, deleteDoctor } = useDoctor();

  const doctor: Doctor | null = id ? getDoctorById(id) ?? null : null;

  async function handleConfirm() {
    if (!id) return;
    await deleteDoctor(id);
    navigate('/doctors'); // ✅ lista de médicos
  }

  function handleCancel() {
    if (!id) {
      navigate('/doctors'); // ✅ se não tiver id, volta pra lista
      return;
    }
    // ✅ detalhes do médico (rota correta: /doctors/details/:id)
    navigate(`/doctors/details/${id}`);
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

  return (
    <PageContainer>
      <PageHeader
        title="Excluir médico"
        description="Confirme a exclusão definitiva do cadastro do profissional."
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Médicos', href: '/doctors' },
          {
            label: doctor.name ?? 'Médico',
            // ✅ breadcrumb apontando para /doctors/details/:id
            href: `/doctors/details/${doctor.id}`,
          },
          { label: 'Excluir' },
        ]}
      />

      <section className={styles.section}>
        <Card>
          <div className={styles.deleteHeader}>
            <div className={styles.deleteHeaderLeft}>
              <h2 className={styles.deleteTitle}>
                Tem certeza que deseja excluir este médico?
              </h2>
              <p className={styles.deleteSubtitle}>
                Essa ação é permanente e não poderá ser desfeita. Os registros
                de agenda podem perder o vínculo com este profissional.
              </p>
            </div>
            <div className={styles.deleteHeaderRight}>
              <Tag tone="danger" size="sm">
                Exclusão permanente
              </Tag>
            </div>
          </div>

          <div className={styles.deleteSummary}>
            <div className={styles.detailsRow}>
              <span className={styles.detailsLabel}>Nome</span>
              <span className={styles.detailsStrong}>
                {doctor.name ?? '—'}
              </span>
            </div>
            <div className={styles.detailsRow}>
              <span className={styles.detailsLabel}>CRM</span>
              <span className={styles.detailsValue}>
                {doctor.crm ?? '—'}
              </span>
            </div>
            <div className={styles.detailsRow}>
              <span className={styles.detailsLabel}>E-mail</span>
              <span className={styles.detailsValue}>
                {doctor.email ?? '—'}
              </span>
            </div>
          </div>

          <div className={styles.deleteFooter}>
            <div className={styles.detailsActionsLeft}>
              <p className={styles.detailsHint}>
                Se não tiver certeza, volte para os detalhes do médico e revise
                as informações da agenda.
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
                tone="danger"
                size="sm"
                onClick={handleConfirm}
              >
                Sim, excluir médico
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </PageContainer>
  );
}
