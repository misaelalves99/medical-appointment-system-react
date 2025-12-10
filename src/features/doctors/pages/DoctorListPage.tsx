// src/features/doctors/pages/DoctorListPage.tsx

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageContainer } from '../../../shared/layout/PageContainer/PageContainer';
import { PageHeader } from '../../../shared/components/PageHeader/PageHeader';
import { Card } from '../../../shared/ui/Card/Card';
import { Button } from '../../../shared/ui/Button/Button';
import { Avatar } from '../../../shared/ui/Avatar/Avatar';
import { Input } from '../../../shared/ui/Input/Input';
import { Tag } from '../../../shared/ui/Tag/Tag';
import { EmptyState } from '../../../shared/ui/Feedback/EmptyState';
import { LoadingSpinner } from '../../../shared/ui/Feedback/LoadingSpinner';

import { useDoctor } from '../../../hooks/useDoctor';
import { useSpecialty } from '../../../hooks/useSpecialty';
import type { Doctor } from '../../../domain/Doctor';

import {
  FiSearch,
  FiEye,
  FiCalendar,
  FiEdit2,
  FiTrash2,
} from 'react-icons/fi';

import styles from '../styles/Doctor.module.css';

export default function DoctorListPage() {
  const navigate = useNavigate();
  const { doctors, isLoading } = useDoctor();
  const { specialties } = useSpecialty();

  const [searchTerm, setSearchTerm] = useState('');

  const specialtyMap = useMemo(
    () =>
      specialties.reduce<Record<string, string>>((acc, specialty) => {
        if (specialty.id != null) {
          acc[String(specialty.id)] = specialty.name ?? '';
        }
        return acc;
      }, {}),
    [specialties],
  );

  const filteredDoctors = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return doctors;

    return doctors.filter((doctor: Doctor) => {
      const name = doctor.name?.toLowerCase() ?? '';
      const crm = doctor.crm?.toLowerCase() ?? '';
      const email = doctor.email?.toLowerCase() ?? '';

      const specialtyName =
        doctor.specialtyId != null
          ? (specialtyMap[String(doctor.specialtyId)] ?? '').toLowerCase()
          : '';

      return (
        name.includes(term) ||
        crm.includes(term) ||
        email.includes(term) ||
        specialtyName.includes(term)
      );
    });
  }, [doctors, searchTerm, specialtyMap]);

  const totalDoctors = doctors.length;
  const totalFiltered = filteredDoctors.length;

  function handleCreateClick() {
    navigate('/doctors/create');
  }

  function handleRowClick(id: string | number) {
    // Linha abre detalhes do médico
    navigate(`/doctors/details/${id}`);
  }

  const headerActions = (
    <Button type="button" variant="solid" size="sm" onClick={handleCreateClick}>
      Novo médico
    </Button>
  );

  return (
    <PageContainer>
      <PageHeader
        title="Médicos"
        description="Gerencie os profissionais da clínica, suas especialidades e disponibilidade."
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Médicos' },
        ]}
        actions={headerActions}
      />

      <section className={styles.section}>
        <Card>
          <div className={styles.listHeader}>
            <div className={styles.listHeaderLeft}>
              <h2 className={styles.listTitle}>Lista de médicos</h2>
              <p className={styles.listSubtitle}>
                Busque por nome, CRM, especialidade ou e-mail para localizar
                profissionais.
              </p>
            </div>

            <div className={styles.listHeaderRight}>
              <Input
                id="doctors-search"
                placeholder="Buscar por nome, CRM, especialidade ou e-mail..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                leftIcon={<FiSearch aria-hidden="true" />}
                aria-label="Buscar médico por nome, CRM, especialidade ou e-mail"
              />
            </div>
          </div>

          {isLoading ? (
            <div className={styles.centered}>
              <LoadingSpinner label="Carregando médicos..." />
            </div>
          ) : totalDoctors === 0 && !searchTerm ? (
            <EmptyState
              title="Nenhum médico cadastrado ainda"
              description="Cadastre o primeiro médico da clínica para começar a organizar sua equipe."
              actions={
                <Button type="button" size="sm" onClick={handleCreateClick}>
                  Cadastrar médico
                </Button>
              }
            />
          ) : filteredDoctors.length === 0 ? (
            <EmptyState
              title="Nenhum médico encontrado"
              description="Nenhum médico corresponde aos filtros. Ajuste a busca ou limpe os filtros."
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
                  {totalFiltered === totalDoctors
                    ? `Mostrando ${totalDoctors} médico${
                        totalDoctors === 1 ? '' : 's'
                      } cadastrados`
                    : `Mostrando ${totalFiltered} de ${totalDoctors} médico${
                        totalDoctors === 1 ? '' : 's'
                      }`}
                </span>
              </div>

              <div className={styles.tableScroll}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Médico</th>
                      <th>Especialidade</th>
                      <th>Contato</th>
                      <th>CRM</th>
                      <th>Status</th>
                      <th className={styles.tableActionsHeader}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDoctors.map((doctor: Doctor) => (
                      <tr
                        key={doctor.id}
                        className={styles.tableRowHover}
                        onClick={() => handleRowClick(doctor.id)}
                      >
                        <td>
                          <div className={styles.doctorCell}>
                            <Avatar
                              name={doctor.name}
                              src={doctor.avatarUrl}
                              size="sm"
                            />
                            <div className={styles.doctorCellText}>
                              <span className={styles.doctorName}>
                                {doctor.name}
                              </span>
                              {doctor.specialtyId != null && (
                                <span className={styles.doctorMeta}>
                                  {specialtyMap[String(doctor.specialtyId)] ??
                                    'Especialidade não informada'}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={styles.tableSecondaryText}>
                            {doctor.specialtyId != null
                              ? specialtyMap[String(doctor.specialtyId)] ?? '—'
                              : '—'}
                          </span>
                        </td>
                        <td>
                          <div className={styles.contactCell}>
                            {doctor.email && (
                              <span className={styles.contactMain}>
                                {doctor.email}
                              </span>
                            )}
                            {doctor.phone && (
                              <span className={styles.contactSub}>
                                {doctor.phone}
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <span className={styles.tableSecondaryText}>
                            {doctor.crm ?? '—'}
                          </span>
                        </td>
                        <td>
                          <Tag
                            tone={doctor.isActive ? 'success' : 'neutral'}
                            size="sm"
                          >
                            {doctor.isActive ? 'Ativo' : 'Inativo'}
                          </Tag>
                        </td>
                        <td className={styles.tableActionsCell}>
                          <div className={styles.tableActions}>
                            {/* Detalhes */}
                            <button
                              type="button"
                              className={styles.tableActionButton}
                              onClick={(event) => {
                                event.stopPropagation();
                                navigate(`/doctors/details/${doctor.id}`);
                              }}
                            >
                              <span
                                className={styles.tableActionButtonIcon}
                                aria-hidden="true"
                              >
                                <FiEye />
                              </span>
                            </button>

                            {/* Agenda / disponibilidade */}
                            <button
                              type="button"
                              className={styles.tableActionButton}
                              onClick={(event) => {
                                event.stopPropagation();
                                navigate(
                                  `/doctor-availability?doctorId=${doctor.id}`,
                                );
                              }}
                            >
                              <span
                                className={styles.tableActionButtonIcon}
                                aria-hidden="true"
                              >
                                <FiCalendar />
                              </span>
                            </button>

                            {/* Editar */}
                            <button
                              type="button"
                              className={styles.tableActionButton}
                              onClick={(event) => {
                                event.stopPropagation();
                                navigate(`/doctors/edit/${doctor.id}`);
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
                                navigate(`/doctors/delete/${doctor.id}`);
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
