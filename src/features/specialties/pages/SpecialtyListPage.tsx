// src/features/specialties/pages/SpecialtyListPage.tsx

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageContainer from '../../../shared/layout/PageContainer/PageContainer';
import PageHeader from '../../../shared/components/PageHeader/PageHeader';
import { Card } from '../../../shared/ui/Card/Card';
import { Button } from '../../../shared/ui/Button/Button';
import { Input } from '../../../shared/ui/Input/Input';
import { Tag } from '../../../shared/ui/Tag/Tag';
import { EmptyState } from '../../../shared/ui/Feedback/EmptyState';
import { LoadingSpinner } from '../../../shared/ui/Feedback/LoadingSpinner';

import { useSpecialty } from '../../../hooks/useSpecialty';
import type { Specialty } from '../../../domain/Specialty';

import { FiSearch, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';

import styles from '../styles/Specialty.module.css';

export default function SpecialtyListPage() {
  const navigate = useNavigate();
  const { specialties, isLoading } = useSpecialty();

  const [searchTerm, setSearchTerm] = useState('');

  const filteredSpecialties = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return specialties;

    return specialties.filter((specialty: Specialty) => {
      const name = specialty.name?.toLowerCase() ?? '';
      const description = specialty.description?.toLowerCase() ?? '';
      return name.includes(term) || description.includes(term);
    });
  }, [specialties, searchTerm]);

  const totalSpecialties = specialties.length;
  const totalFiltered = filteredSpecialties.length;

  function handleCreateClick() {
    navigate('/specialties/create');
  }

  function handleRowClick(id: string | number) {
    // Linha abre detalhes da especialidade
    navigate(`/specialties/details/${id}`);
  }

  return (
    <PageContainer>
      <PageHeader
        title="Especialidades"
        subtitle="Organize as especialidades atendidas na clínica para manter a agenda e os cadastros consistentes."
        breadcrumbItems={[
          { label: 'Dashboard', to: '/' },
          { label: 'Especialidades' },
        ]}
        primaryAction={
          <Button type="button" size="sm" onClick={handleCreateClick}>
            Nova especialidade
          </Button>
        }
      />

      <section className={styles.section}>
        <Card>
          <div className={styles.listHeader}>
            <div className={styles.listHeaderLeft}>
              <h2 className={styles.listTitle}>Lista de especialidades</h2>
              <p className={styles.listSubtitle}>
                Pesquise por nome ou descrição para encontrar rapidamente a
                especialidade desejada.
              </p>
            </div>

            <div className={styles.listHeaderRight}>
              <Input
                id="specialties-search"
                placeholder="Buscar por nome ou descrição..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                leftIcon={<FiSearch aria-hidden="true" />}
                aria-label="Buscar especialidade por nome ou descrição"
              />
            </div>
          </div>

          {isLoading ? (
            <div className={styles.centered}>
              <LoadingSpinner />
            </div>
          ) : totalSpecialties === 0 && !searchTerm ? (
            <EmptyState
              title="Nenhuma especialidade cadastrada ainda"
              description="Cadastre a primeira especialidade da clínica para começar a organizar os atendimentos."
              actions={
                <Button type="button" size="sm" onClick={handleCreateClick}>
                  Cadastrar especialidade
                </Button>
              }
            />
          ) : filteredSpecialties.length === 0 ? (
            <EmptyState
              title="Nenhuma especialidade encontrada"
              description="Nenhuma especialidade corresponde à busca. Ajuste o texto ou limpe os filtros."
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
                  {totalFiltered === totalSpecialties
                    ? `Mostrando ${totalSpecialties} especialidade${
                        totalSpecialties === 1 ? '' : 's'
                      } cadastradas`
                    : `Mostrando ${totalFiltered} de ${totalSpecialties} especialidade${
                        totalSpecialties === 1 ? '' : 's'
                      }`}
                </span>
              </div>

              <div className={styles.tableScroll}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Descrição</th>
                      <th>Status</th>
                      <th className={styles.tableActionsHeader}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSpecialties.map((specialty: Specialty) => (
                      <tr
                        key={specialty.id}
                        className={styles.tableRowHover}
                        onClick={() => handleRowClick(specialty.id)}
                      >
                        <td>
                          <div className={styles.nameCell}>
                            <span className={styles.specialtyName}>
                              {specialty.name}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className={styles.tableSecondaryText}>
                            {specialty.description ||
                              'Sem descrição cadastrada.'}
                          </span>
                        </td>
                        <td>
                          <Tag
                            label={specialty.isActive ? 'Ativa' : 'Inativa'}
                            color={specialty.isActive ? 'green' : 'gray'}
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
                                navigate(
                                  `/specialties/details/${specialty.id}`,
                                );
                              }}
                            >
                              <span
                                className={styles.tableActionButtonIcon}
                                aria-hidden="true"
                              >
                                <FiEye />
                              </span>
                            </button>

                            {/* Editar */}
                            <button
                              type="button"
                              className={styles.tableActionButton}
                              onClick={(event) => {
                                event.stopPropagation();
                                navigate(
                                  `/specialties/edit/${specialty.id}`,
                                );
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
                                navigate(
                                  `/specialties/delete/${specialty.id}`,
                                );
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
