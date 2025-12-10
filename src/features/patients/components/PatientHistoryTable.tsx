// src/features/patients/components/PatientHistoryTable.tsx

import type { ReactElement } from 'react';

import type { PatientHistoryItem } from '../../../domain/PatientHistory';
import { useDoctor } from '../../../hooks/useDoctor';
import { useSpecialty } from '../../../hooks/useSpecialty';
import { formatDate } from '../../../utils/dateUtils';

import styles from '../styles/Patient.module.css';

interface PatientHistoryTableProps {
  items: PatientHistoryItem[];
}

export function PatientHistoryTable({
  items,
}: PatientHistoryTableProps): ReactElement {
  const { doctors } = useDoctor();
  const { specialties } = useSpecialty();

  function getDoctorName(doctorId?: string | number) {
    if (!doctorId) return '—';
    const found = doctors.find((d) => String(d.id) === String(doctorId));
    return found?.name ?? '—';
  }

  function getSpecialtyName(specialtyId?: string | number) {
    if (!specialtyId) return '—';
    const found = specialties.find((s) => String(s.id) === String(specialtyId));
    return found?.name ?? '—';
  }

  function getTypeLabel(type: PatientHistoryItem['type']) {
    switch (type) {
      case 'CONSULTATION':
        return 'Consulta';
      case 'EXAM':
        return 'Exame';
      case 'PROCEDURE':
        return 'Procedimento';
      case 'NOTE':
      default:
        return 'Nota';
    }
  }

  function getTypeClass(type: PatientHistoryItem['type']) {
    switch (type) {
      case 'CONSULTATION':
        return styles.historyTypeConsultation;
      case 'EXAM':
        return styles.historyTypeExam;
      case 'PROCEDURE':
        return styles.historyTypeProcedure;
      case 'NOTE':
      default:
        return styles.historyTypeNote;
    }
  }

  if (!items.length) {
    return (
      <p className={styles.emptyHistoryText}>
        Nenhum registro de histórico para este paciente ainda. As consultas,
        exames e procedimentos aparecerão aqui com o passar do tempo.
      </p>
    );
  }

  return (
    <div className={styles.historyTableWrapper}>
      <div className={styles.tableScroll}>
        <table className={styles.historyTable}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Tipo</th>
              <th>Médico</th>
              <th>Especialidade</th>
              <th>Descrição</th>
              <th>Criado por</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className={styles.historyDateCell}>
                    <span className={styles.historyDate}>
                      {formatDate(item.date)}
                    </span>
                    {item.createdAt && (
                      <span className={styles.historyDateMeta}>
                        Registro em {formatDate(item.createdAt)}
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <span
                    className={`${styles.historyTypeBadge} ${getTypeClass(item.type)}`}
                  >
                    {getTypeLabel(item.type)}
                  </span>
                </td>
                <td>
                  <div className={styles.historyDoctorCell}>
                    <span className={styles.historyMainText}>
                      {getDoctorName(item.doctorId)}
                    </span>
                    {item.doctorId && (
                      <span className={styles.historySubText}>
                        ID #{item.doctorId}
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <span className={styles.historyMainText}>
                    {getSpecialtyName(item.specialtyId)}
                  </span>
                </td>
                <td>
                  <p className={styles.historyDescriptionText}>
                    {item.description}
                  </p>
                </td>
                <td>
                  <div className={styles.historyCreatedByCell}>
                    <span className={styles.historyMainText}>
                      {item.createdBy ?? '—'}
                    </span>
                    {item.source && (
                      <span className={styles.historySubText}>
                        {item.source}
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
