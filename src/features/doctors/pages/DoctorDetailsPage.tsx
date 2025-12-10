// src/features/doctors/pages/DoctorDetailsPage.tsx

import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PageContainer } from '../../../shared/layout/PageContainer/PageContainer';
import { PageHeader } from '../../../shared/components/PageHeader/PageHeader';
import { Card } from '../../../shared/ui/Card/Card';
import { Button } from '../../../shared/ui/Button/Button';
import { Avatar } from '../../../shared/ui/Avatar/Avatar';
import { Tag } from '../../../shared/ui/Tag/Tag';
import { EmptyState } from '../../../shared/ui/Feedback/EmptyState';

import { useDoctor } from '../../../hooks/useDoctor';
import { useSpecialty } from '../../../hooks/useSpecialty';
import type { Doctor } from '../../../domain/Doctor';
import DoctorAvailabilitySummary from '../components/DoctorAvailabilitySummary';

import styles from '../styles/Doctor.module.css';

export default function DoctorDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getDoctorById, getDoctorAvailability } = useDoctor();
  const { specialties } = useSpecialty();

  const doctor: Doctor | null = useMemo(
    () => (id ? getDoctorById(id) ?? null : null),
    [getDoctorById, id],
  );

  const availability = useMemo(
    () => (id ? getDoctorAvailability(id) ?? [] : []),
    [getDoctorAvailability, id],
  );

  const specialtyName = useMemo(() => {
    if (!doctor?.specialtyId) return null;
    const found = specialties.find(
      (specialty) => String(specialty.id) === String(doctor.specialtyId),
    );
    return found?.name ?? null;
  }, [doctor?.specialtyId, specialties]);

  function handleEdit() {
    if (!doctor) return;
    // Rota alinhada: /doctors/edit/:id
    navigate(`/doctors/edit/${doctor.id}`);
  }

  function handleDelete() {
    if (!doctor) return;
    // Rota alinhada: /doctors/delete/:id
    navigate(`/doctors/delete/${doctor.id}`);
  }

  function handleOpenAvailability() {
    if (!doctor) return;
    navigate(`/doctor-availability?doctorId=${doctor.id}`);
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

  const headerActions = (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleOpenAvailability}
      >
        Ver disponibilidade
      </Button>
      <Button
        type="button"
        variant="solid"
        size="sm"
        onClick={handleEdit}
      >
        Editar
      </Button>
    </>
  );

  return (
    <PageContainer>
      <PageHeader
        title={doctor.name ?? 'Médico'}
        description="Visão geral dos dados do profissional, especialidades e disponibilidade."
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Médicos', href: '/doctors' },
          { label: doctor.name ?? 'Médico' },
        ]}
        actions={headerActions}
      />

      <section className={styles.section}>
        <Card>
          <div className={styles.detailsHeader}>
            <div className={styles.detailsHeaderLeft}>
              <Avatar
                name={doctor.name}
                src={doctor.avatarUrl}
                size="lg"
              />
              <div className={styles.detailsHeaderText}>
                <h2 className={styles.detailsName}>{doctor.name}</h2>
                <div className={styles.detailsMetaRow}>
                  {specialtyName && (
                    <span className={styles.detailsMeta}>
                      {specialtyName}
                    </span>
                  )}
                  {doctor.crm && (
                    <span className={styles.detailsMeta}>
                      CRM {doctor.crm}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.detailsHeaderRight}>
              <Tag
                tone={doctor.isActive ? 'success' : 'neutral'}
                size="sm"
              >
                {doctor.isActive ? 'Ativo na clínica' : 'Inativo'}
              </Tag>
            </div>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailsBlock}>
              <h3 className={styles.detailsBlockTitle}>Contato</h3>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>E-mail</span>
                <span className={styles.detailsValue}>
                  {doctor.email ?? '—'}
                </span>
              </div>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Telefone</span>
                <span className={styles.detailsValue}>
                  {doctor.phone ?? '—'}
                </span>
              </div>
            </div>

            <div className={styles.detailsBlock}>
              <h3 className={styles.detailsBlockTitle}>Especialidade</h3>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Área principal</span>
                <span className={styles.detailsValue}>
                  {specialtyName ?? '—'}
                </span>
              </div>
            </div>

            <div className={styles.detailsBlock}>
              <h3 className={styles.detailsBlockTitle}>
                Informações gerais
              </h3>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Bio</span>
                <span className={styles.detailsValue}>
                  {doctor.bio ?? 'Sem bio cadastrada.'}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.detailsAvailability}>
            <DoctorAvailabilitySummary availability={availability} />
          </div>

          <div className={styles.detailsActionsFooter}>
            <div className={styles.detailsActionsLeft}>
              <p className={styles.detailsHint}>
                Mantenha as informações do médico atualizadas para facilitar o
                agendamento e a comunicação com os pacientes.
              </p>
            </div>
            <div className={styles.detailsActionsRight}>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleOpenAvailability}
              >
                Ver agenda do médico
              </Button>
              <Button
                type="button"
                variant="ghost"
                tone="danger"
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
