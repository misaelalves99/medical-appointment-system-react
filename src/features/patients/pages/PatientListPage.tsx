// src/features/patients/pages/PatientListPage.tsx

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageContainer from '../../../shared/layout/PageContainer/PageContainer';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import { Card } from '../../../shared/ui/Card/Card';
import { Button } from '../../../shared/ui/Button/Button';
import { Input } from '../../../shared/ui/Input/Input';
import { Tag } from '../../../shared/ui/Tag/Tag';
import { Avatar } from '../../../shared/ui/Avatar/Avatar';
import { EmptyState } from '../../../shared/ui/Feedback/EmptyState';
import { LoadingSpinner } from '../../../shared/ui/Feedback/LoadingSpinner';

import { usePatient } from '../../../hooks/usePatient';
import { formatDate } from '../../../utils/dateUtils';
import { formatCpf, formatPhone } from '../../../utils/formatters';

import type { Patient } from '../../../domain/Patient';

import { FiSearch, FiEye, FiClock, FiEdit2, FiTrash2 } from 'react-icons/fi';

import styles from '../styles/Patient.module.css';

export default function PatientListPage() {
  const navigate = useNavigate();
  const { patients, isLoading } = usePatient();

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return patients;

    return patients.filter((patient: Patient) => {
      const name = patient.name?.toLowerCase() ?? '';
      const cpf = patient.cpf?.toLowerCase() ?? '';
      const email = patient.email?.toLowerCase() ?? '';

      return name.includes(term) || cpf.includes(term) || email.includes(term);
    });
  }, [patients, searchTerm]);

  const totalPatients = patients.length;
  const totalFiltered = filteredPatients.length;

  function handleCreateClick() {
    navigate('/patients/create');
  }

  function handleRowClick(id: string | number) {
    // Row abre a ficha do paciente (detalhes)
    navigate(`/patients/details/${id}`);
  }

  return (
    <PageContainer>
      <PageHeader
        title="Pacientes"
        subtitle="Gerencie os cadastros de pacientes da clínica em um só lugar."
        breadcrumbItems={[
          { label: 'Dashboard', to: '/' },
          { label: 'Pacientes' },
        ]}
        primaryAction={
          <Button type="button" size="sm" onClick={handleCreateClick}>
            Novo paciente
          </Button>
        }
      />

      <section className={styles.section}>
        <Card>
          <div className={styles.listHeader}>
            <div className={styles.listHeaderLeft}>
              <h2 className={styles.listTitle}>Lista de pacientes</h2>
              <p className={styles.listSubtitle}>
                Busque por nome, CPF ou e-mail para localizar um paciente
                rapidamente.
              </p>
            </div>

            <div className={styles.listHeaderRight}>
              <Input
                id="patients-search"
                placeholder="Buscar por nome, CPF ou e-mail..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                leftIcon={<FiSearch aria-hidden="true" />}
                aria-label="Buscar paciente por nome, CPF ou e-mail"
              />
            </div>
          </div>

          {isLoading ? (
            <div className={styles.centered}>
              <LoadingSpinner label="Carregando pacientes..." />
            </div>
          ) : totalPatients === 0 && !searchTerm ? (
            <EmptyState
              title="Nenhum paciente cadastrado ainda"
              description="Cadastre o primeiro paciente da clínica para começar a organizar os dados."
              actions={
                <Button type="button" size="sm" onClick={handleCreateClick}>
                  Cadastrar paciente
                </Button>
              }
            />
          ) : filteredPatients.length === 0 ? (
            <EmptyState
              title="Nenhum paciente encontrado"
              description="Nenhum paciente corresponde aos filtros. Ajuste a busca ou limpe os filtros."
              actions={
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setSearchTerm('')}
                >
                  Limpar busca
                </Button>
              }
            />
          ) : (
            <div className={styles.tableWrapper}>
              <div className={styles.tableMetaRow}>
                <span className={styles.tableMetaText}>
                  {totalFiltered === totalPatients
                    ? `Mostrando ${totalPatients} paciente${
                        totalPatients === 1 ? '' : 's'
                      } cadastrados`
                    : `Mostrando ${totalFiltered} de ${totalPatients} paciente${
                        totalPatients === 1 ? '' : 's'
                      }`}
                </span>
              </div>

              <div className={styles.tableScroll}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Paciente</th>
                      <th>Contato</th>
                      <th>Documento</th>
                      <th>Nascimento</th>
                      <th>Status</th>
                      <th className={styles.tableActionsHeader}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient: Patient) => (
                      <tr
                        key={patient.id}
                        className={styles.tableRowHover}
                        onClick={() => handleRowClick(patient.id)}
                      >
                        <td>
                          <div className={styles.patientCell}>
                            <Avatar
                              name={patient.name}
                              src={patient.avatarUrl}
                              size="sm"
                            />
                            <div className={styles.patientCellText}>
                              <span className={styles.patientName}>
                                {patient.name}
                              </span>
                              {patient.gender && (
                                <span className={styles.patientMeta}>
                                  {patient.gender === 'MALE' && 'Masculino'}
                                  {patient.gender === 'FEMALE' && 'Feminino'}
                                  {patient.gender === 'OTHER' && 'Outro'}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className={styles.contactCell}>
                            {patient.email && (
                              <span className={styles.contactMain}>
                                {patient.email}
                              </span>
                            )}
                            {patient.phone && (
                              <span className={styles.contactSub}>
                                {formatPhone(patient.phone)}
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <span className={styles.tableSecondaryText}>
                            {patient.cpf ? formatCpf(patient.cpf) : '—'}
                          </span>
                        </td>
                        <td>
                          <span className={styles.tableSecondaryText}>
                            {patient.birthDate
                              ? formatDate(patient.birthDate)
                              : '—'}
                          </span>
                        </td>
                        <td>
                          <Tag
                            label={patient.isActive ? 'Ativo' : 'Inativo'}
                            color={patient.isActive ? 'green' : 'gray'}
                            variant="filled"
                            size="sm"
                          />
                        </td>
                        <td className={styles.tableActionsCell}>
                          <div className={styles.tableActions}>
                            {/* Detalhes */}
                            <button
                              type="button"
                              className={styles.tableActionButton}
                              onClick={(event) => {
                                event.stopPropagation();
                                navigate(`/patients/details/${patient.id}`);
                              }}
                            >
                              <span
                                className={styles.tableActionButtonIcon}
                                aria-hidden="true"
                              >
                                <FiEye />
                              </span>
                            </button>

                            {/* Histórico */}
                            <button
                              type="button"
                              className={styles.tableActionButton}
                              onClick={(event) => {
                                event.stopPropagation();
                                navigate(`/patients/history/${patient.id}`);
                              }}
                            >
                              <span
                                className={styles.tableActionButtonIcon}
                                aria-hidden="true"
                              >
                                <FiClock />
                              </span>
                            </button>

                            {/* Editar */}
                            <button
                              type="button"
                              className={styles.tableActionButton}
                              onClick={(event) => {
                                event.stopPropagation();
                                navigate(`/patients/edit/${patient.id}`);
                              }}
                            >
                              <span
                                className={styles.tableActionButtonIcon}
                                aria-hidden="true"
                              >
                                <FiEdit2 />
                              </span>
                            </button>

                            {/* Excluir */}
                            <button
                              type="button"
                              className={`${styles.tableActionButton} ${styles.tableActionButtonDanger}`}
                              onClick={(event) => {
                                event.stopPropagation();
                                navigate(`/patients/delete/${patient.id}`);
                              }}
                            >
                              <span
                                className={styles.tableActionButtonIcon}
                                aria-hidden="true"
                              >
                                <FiTrash2 />
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Card>
      </section>
    </PageContainer>
  );
}
