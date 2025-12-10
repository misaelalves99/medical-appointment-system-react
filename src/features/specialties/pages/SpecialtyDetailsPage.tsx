// src/features/specialties/pages/SpecialtyDetailsPage.tsx

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

export default function SpecialtyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSpecialtyById } = useSpecialty();

  const specialty: Specialty | null = id ? getSpecialtyById(id) ?? null : null;

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

  function handleEdit() {
    // Rota alinhada com AppRouter: /specialties/edit/:id
    navigate(`/specialties/edit/${currentSpecialty.id}`);
  }

  function handleDelete() {
    // Rota alinhada com AppRouter: /specialties/delete/:id
    navigate(`/specialties/delete/${currentSpecialty.id}`);
  }

  return (
    <PageContainer>
      <PageHeader
        title={currentSpecialty.name ?? 'Especialidade'}
        subtitle="Visão geral da especialidade e de como ela é apresentada nos cadastros e agenda."
        breadcrumbItems={[
          { label: 'Dashboard', to: '/' },
          { label: 'Especialidades', to: '/specialties' },
          { label: currentSpecialty.name ?? 'Especialidade' },
        ]}
        primaryAction={
          <Button type="button" size="sm" onClick={handleEdit}>
            Editar
          </Button>
        }
        secondaryAction={
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={handleDelete}
          >
            Excluir
          </Button>
        }
      />

      <section className={styles.section}>
        <Card>
          <div className={styles.detailsHeader}>
            <div className={styles.detailsHeaderLeft}>
              <div className={styles.specialtyIconCircle}>
                <span className={styles.specialtyIconInitial}>
                  {currentSpecialty.name?.charAt(0).toUpperCase() ?? 'E'}
                </span>
              </div>
              <div className={styles.detailsHeaderText}>
                <h2 className={styles.detailsName}>{currentSpecialty.name}</h2>
                <div className={styles.detailsMetaRow}>
                  <Tag
                    label={currentSpecialty.isActive ? 'Ativa' : 'Inativa'}
                    color={currentSpecialty.isActive ? 'green' : 'gray'}
                    variant="filled"
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailsBlock}>
              <h3 className={styles.detailsBlockTitle}>Descrição</h3>
              <p className={styles.detailsValue}>
                {currentSpecialty.description ||
                  'Sem descrição cadastrada para esta especialidade.'}
              </p>
            </div>
          </div>

          <div className={styles.detailsActionsFooter}>
            <div className={styles.detailsActionsLeft}>
              <p className={styles.detailsHint}>
                Use descrições claras para ajudar a recepção a escolher a
                especialidade correta no momento do agendamento.
              </p>
            </div>
            <div className={styles.detailsActionsRight}>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleEdit}
              >
                Editar
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleDelete}
              >
                Excluir
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </PageContainer>
  );
}
