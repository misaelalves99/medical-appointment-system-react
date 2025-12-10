// src/features/specialties/pages/SpecialtyDeletePage.tsx

import { useNavigate, useParams } from 'react-router-dom';

import PageContainer from '../../../shared/layout/PageContainer/PageContainer';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import { Card } from '../../../shared/ui/Card/Card';
import { Button } from '../../../shared/ui/Button/Button';
import { Tag } from '../../../shared/ui/Tag/Tag';
import { EmptyState } from '../../../shared/ui/Feedback/EmptyState';

import { useSpecialty } from '../../../hooks/useSpecialty';
import type { Specialty } from '../../../domain/Specialty';

import styles from '../styles/Specialty.module.css';

export default function SpecialtyDeletePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSpecialtyById, deleteSpecialty } = useSpecialty();

  const specialty: Specialty | null = id ? getSpecialtyById(id) ?? null : null;

  async function handleConfirm() {
    if (!id) return;
    await deleteSpecialty(id);
    navigate('/specialties'); // ✅ lista
  }

  function handleCancel() {
    if (!id) {
      navigate('/specialties'); // ✅ fallback
      return;
    }
    // ✅ rota correta de detalhes: /specialties/details/:id
    navigate(`/specialties/details/${id}`);
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

  return (
    <PageContainer>
      <PageHeader
        title="Excluir especialidade"
        subtitle="Confirme a exclusão definitiva desta especialidade."
        breadcrumbItems={[
          { label: 'Dashboard', to: '/' },
          { label: 'Especialidades', to: '/specialties' },
          {
            label: currentSpecialty.name ?? 'Especialidade',
            // ✅ detalhes da especialidade
            to: `/specialties/details/${currentSpecialty.id}`,
          },
          { label: 'Excluir' },
        ]}
      />

      <section className={styles.section}>
        <Card>
          <div className={styles.deleteHeader}>
            <div className={styles.deleteHeaderLeft}>
              <h2 className={styles.deleteTitle}>
                Tem certeza que deseja excluir esta especialidade?
              </h2>
              <p className={styles.deleteSubtitle}>
                Essa ação é permanente e não poderá ser desfeita. Consultas que
                utilizem esta especialidade podem perder o vínculo.
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
              <span className={styles.detailsLabel}>Nome</span>
              <span className={styles.detailsStrong}>
                {currentSpecialty.name ?? '—'}
              </span>
            </div>
            <div className={styles.detailsRow}>
              <span className={styles.detailsLabel}>Descrição</span>
              <span className={styles.detailsValue}>
                {currentSpecialty.description ||
                  'Sem descrição cadastrada.'}
              </span>
            </div>
          </div>

          <div className={styles.deleteFooter}>
            <div className={styles.detailsActionsLeft}>
              <p className={styles.detailsHint}>
                Se não tiver certeza, volte para os detalhes da especialidade e
                revise como ela está sendo utilizada.
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
                variant="danger"
                size="sm"
                onClick={handleConfirm}
              >
                Sim, excluir especialidade
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </PageContainer>
  );
}
