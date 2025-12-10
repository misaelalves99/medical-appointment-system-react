// src/features/appointments/components/AppointmentForm.tsx

import { FormEvent, useEffect, useState } from 'react';

import { Card } from '../../../shared/ui/Card/Card';
import { Button } from '../../../shared/ui/Button/Button';
import { Input } from '../../../shared/ui/Input/Input';
import { Select } from '../../../shared/ui/Select/Select';

import { usePatient } from '../../../hooks/usePatient';
import { useDoctor } from '../../../hooks/useDoctor';
import { useSpecialty } from '../../../hooks/useSpecialty';

import type { AppointmentStatus } from '../../../domain/Appointment';

import styles from '../styles/Appointment.module.css';

export type AppointmentFormValues = {
  id?: string | number;
  patientId: string;
  doctorId: string;
  specialtyId?: string;
  dateTime: string;
  status: AppointmentStatus;
  notes?: string;
};

type Mode = 'create' | 'edit';

type AppointmentFormProps = {
  mode: Mode;
  initialValues: AppointmentFormValues;
  onSubmit: (values: AppointmentFormValues) => Promise<void> | void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

export default function AppointmentForm({
  mode,
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting,
}: AppointmentFormProps) {
  const { patients } = usePatient();
  const { doctors } = useDoctor();
  const { specialties } = useSpecialty();

  const [values, setValues] = useState<AppointmentFormValues>(initialValues);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  function validate(nextValues: AppointmentFormValues) {
    const nextErrors: Record<string, string> = {};

    if (!nextValues.patientId) {
      nextErrors.patientId = 'Selecione um paciente.';
    }

    if (!nextValues.doctorId) {
      nextErrors.doctorId = 'Selecione um médico.';
    }

    if (!nextValues.dateTime) {
      nextErrors.dateTime = 'Informe data e horário da consulta.';
    }

    if (!nextValues.status) {
      nextErrors.status = 'Selecione o status da consulta.';
    }

    return nextErrors;
  }

  function handleChange(field: keyof AppointmentFormValues, value: string) {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);

    const nextErrors = validate(nextValues);
    setErrors(nextErrors);
  }

  function handleBlur(field: keyof AppointmentFormValues) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({
      patientId: true,
      doctorId: true,
      dateTime: true,
      status: true,
    });

    if (Object.keys(nextErrors).length > 0) return;

    await onSubmit(values);
  }

  const isEdit = mode === 'edit';

  return (
    <Card>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.formHeader}>
          <div>
            <h2 className={styles.formTitle}>
              {isEdit ? 'Editar consulta' : 'Nova consulta'}
            </h2>
            <p className={styles.formSubtitle}>
              Preencha as informações da consulta para organizar a agenda da clínica.
            </p>
          </div>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <label className={styles.fieldLabel} htmlFor="patientId">
              Paciente
            </label>
            <Select
              id="patientId"
              value={values.patientId}
              onChange={(event) => handleChange('patientId', event.target.value)}
              onBlur={() => handleBlur('patientId')}
              hasError={!!errors.patientId && touched.patientId}
            >
              <option value="">Selecione...</option>
              {patients.map((patient) => (
                <option key={patient.id} value={String(patient.id)}>
                  {patient.name}
                </option>
              ))}
            </Select>
            {errors.patientId && touched.patientId && (
              <p className={styles.fieldError}>{errors.patientId}</p>
            )}
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldLabel} htmlFor="doctorId">
              Médico(a)
            </label>
            <Select
              id="doctorId"
              value={values.doctorId}
              onChange={(event) => handleChange('doctorId', event.target.value)}
              onBlur={() => handleBlur('doctorId')}
              hasError={!!errors.doctorId && touched.doctorId}
            >
              <option value="">Selecione...</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={String(doctor.id)}>
                  {doctor.name}
                </option>
              ))}
            </Select>
            {errors.doctorId && touched.doctorId && (
              <p className={styles.fieldError}>{errors.doctorId}</p>
            )}
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldLabel} htmlFor="specialtyId">
              Especialidade (opcional)
            </label>
            <Select
              id="specialtyId"
              value={values.specialtyId ?? ''}
              onChange={(event) => handleChange('specialtyId', event.target.value)}
            >
              <option value="">Selecione...</option>
              {specialties.map((specialty) => (
                <option key={specialty.id} value={String(specialty.id)}>
                  {specialty.name}
                </option>
              ))}
            </Select>
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldLabel} htmlFor="dateTime">
              Data e horário
            </label>
            <Input
              id="dateTime"
              type="datetime-local"
              value={values.dateTime}
              onChange={(event) => handleChange('dateTime', event.target.value)}
              onBlur={() => handleBlur('dateTime')}
              hasError={!!errors.dateTime && touched.dateTime}
            />
            {errors.dateTime && touched.dateTime && (
              <p className={styles.fieldError}>{errors.dateTime}</p>
            )}
          </div>

          <div className={styles.formField}>
            <label className={styles.fieldLabel} htmlFor="status">
              Status
            </label>
            <Select
              id="status"
              value={values.status}
              onChange={(event) =>
                handleChange('status', event.target.value as AppointmentStatus)
              }
              onBlur={() => handleBlur('status')}
              hasError={!!errors.status && touched.status}
            >
              <option value="SCHEDULED">Agendada</option>
              <option value="CONFIRMED">Confirmada</option>
              <option value="COMPLETED">Realizada</option>
              <option value="CANCELLED">Cancelada</option>
              <option value="NO_SHOW">Não compareceu</option>
            </Select>
            {errors.status && touched.status && (
              <p className={styles.fieldError}>{errors.status}</p>
            )}
          </div>

          <div className={`${styles.formField} ${styles.formFieldFull}`}>
            <label className={styles.fieldLabel} htmlFor="notes">
              Observações (opcional)
            </label>
            <textarea
              id="notes"
              className={styles.textarea}
              value={values.notes ?? ''}
              onChange={(event) => handleChange('notes', event.target.value)}
              rows={4}
              placeholder="Ex.: jejum, exames a trazer, observações importantes para o dia da consulta..."
            />
          </div>
        </div>

        <div className={styles.formFooter}>
          <div className={styles.formFooterLeft}>
            {!isEdit && (
              <p className={styles.formHint}>
                A consulta será exibida automaticamente na agenda e na listagem.
              </p>
            )}
          </div>
          <div className={styles.formFooterActions}>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              size="sm"
              tone="primary"
              variant="solid"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? isEdit
                  ? 'Salvando...'
                  : 'Criando...'
                : isEdit
                  ? 'Salvar alterações'
                  : 'Criar consulta'}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
