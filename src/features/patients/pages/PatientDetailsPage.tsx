// src/features/patients/pages/PatientDetailsPage.tsx

import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PageContainer from '../../../shared/layout/PageContainer/PageContainer';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import { Card } from '../../../shared/ui/Card/Card';
import { Button } from '../../../shared/ui/Button/Button';
import { Tag } from '../../../shared/ui/Tag/Tag';
import { EmptyState } from '../../../shared/ui/Feedback/EmptyState';
import { Avatar } from '../../../shared/ui/Avatar/Avatar';

import { usePatient } from '../../../hooks/usePatient';
import type { Patient } from '../../../domain/Patient';
import { formatDate } from '../../../utils/dateUtils';
import { formatCpf, formatPhone } from '../../../utils/formatters';

import styles from '../styles/Patient.module.css';

export default function PatientDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPatientById } = usePatient();

  const patient: Patient | null = useMemo(() => {
    if (!id) return null;
    const found = getPatientById(id);
    return found ?? null;
  }, [getPatientById, id]);

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

  // A partir daqui o TypeScript sabe que não é null
  const currentPatient: Patient = patient;

  function handleEdit() {
    navigate(`/patients/edit/${currentPatient.id}`);
  }

  function handleHistory() {
    navigate(`/patients/history/${currentPatient.id}`);
  }

  function handleUploadPicture() {
    navigate(`/patients/upload-profile-picture/${currentPatient.id}`);
  }

  function handleDelete() {
    navigate(`/patients/delete/${currentPatient.id}`);
  }

  return (
    <PageContainer>
      <PageHeader
        title={currentPatient.name ?? 'Paciente'}
        subtitle="Visão geral dos dados cadastrais e informações principais do paciente."
        breadcrumbItems={[
          { label: 'Dashboard', to: '/' },
          { label: 'Pacientes', to: '/patients' },
          { label: currentPatient.name ?? 'Paciente' },
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
            onClick={handleHistory}
          >
            Histórico
          </Button>
        }
      />

      <section className={styles.section}>
        <Card>
          <div className={styles.detailsHeader}>
            <div className={styles.detailsHeaderLeft}>
              <Avatar
                name={currentPatient.name}
                src={currentPatient.avatarUrl}
                size="lg"
              />
              <div className={styles.detailsHeaderText}>
                <h2 className={styles.detailsName}>{currentPatient.name}</h2>
                <div className={styles.detailsMetaRow}>
                  {currentPatient.gender && (
                    <span className={styles.detailsMeta}>
                      {currentPatient.gender === 'MALE' && 'Masculino'}
                      {currentPatient.gender === 'FEMALE' && 'Feminino'}
                      {currentPatient.gender === 'OTHER' && 'Outro'}
                    </span>
                  )}
                  {currentPatient.birthDate && (
                    <span className={styles.detailsMeta}>
                      Nascido(a) em {formatDate(currentPatient.birthDate)}
                    </span>
                  )}
                  {currentPatient.cpf && (
                    <span className={styles.detailsMeta}>
                      CPF {formatCpf(currentPatient.cpf)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.detailsHeaderRight}>
              <Tag
                label={currentPatient.isActive ? 'Ativo na clínica' : 'Inativo'}
                color={currentPatient.isActive ? 'green' : 'gray'}
                variant="filled"
                size="sm"
              />
            </div>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailsBlock}>
              <h3 className={styles.detailsBlockTitle}>Contato</h3>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>E-mail</span>
                <span className={styles.detailsValue}>
                  {currentPatient.email ?? '—'}
                </span>
              </div>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Telefone</span>
                <span className={styles.detailsValue}>
                  {currentPatient.phone
                    ? formatPhone(currentPatient.phone)
                    : '—'}
                </span>
              </div>
            </div>

            <div className={styles.detailsBlock}>
              <h3 className={styles.detailsBlockTitle}>Endereço</h3>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Endereço</span>
                <span className={styles.detailsValue}>
                  {currentPatient.address ?? '—'}
                </span>
              </div>
            </div>

            <div className={styles.detailsBlock}>
              <h3 className={styles.detailsBlockTitle}>Informações gerais</h3>
              <div className={styles.detailsRow}>
                <span className={styles.detailsLabel}>Observações</span>
                <span className={styles.detailsValue}>
                  {currentPatient.notes ?? 'Sem observações registradas.'}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.detailsActionsFooter}>
            <div className={styles.detailsActionsLeft}>
              <p className={styles.detailsHint}>
                Use o histórico para acompanhar consultas, evoluções e registros
                anteriores.
              </p>
            </div>
            <div className={styles.detailsActionsRight}>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleUploadPicture}
              >
                Atualizar foto
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleHistory}
              >
                Ver histórico
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
