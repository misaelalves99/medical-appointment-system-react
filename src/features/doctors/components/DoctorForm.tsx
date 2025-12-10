// src/features/doctors/components/DoctorForm.tsx

import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';

import { Input } from '../../../shared/ui/Input/Input';
import { Select } from '../../../shared/ui/Select/Select';
import { Button } from '../../../shared/ui/Button/Button';

import { useSpecialty } from '../../../hooks/useSpecialty';

import styles from '../styles/Doctor.module.css';

export type DoctorFormValues = {
  id?: string | number;
  name: string;
  email: string;
  phone: string;
  crm: string;
  specialtyId: string;
  bio?: string;
  isActive: boolean;
};

type Mode = 'create' | 'edit';

type DoctorFormProps = {
  mode: Mode;
  initialValues: DoctorFormValues;
  onSubmit: (values: DoctorFormValues) => Promise<void> | void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

export default function DoctorForm({
  mode,
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting,
}: DoctorFormProps) {
  const { specialties } = useSpecialty();

  const [values, setValues] = useState<DoctorFormValues>(initialValues);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  function validate(nextValues: DoctorFormValues) {
    const nextErrors: Record<string, string> = {};

    if (!nextValues.name.trim()) {
      nextErrors.name = 'Informe o nome completo do médico.';
    }

    if (!nextValues.crm.trim()) {
      nextErrors.crm = 'Informe o CRM do médico.';
    }

    if (!nextValues.specialtyId) {
      nextErrors.specialtyId = 'Selecione a especialidade principal.';
    }

    if (!nextValues.email.trim()) {
      nextErrors.email = 'Informe um e-mail válido.';
    }

    if (!nextValues.phone.trim()) {
      nextErrors.phone = 'Informe um telefone de contato.';
    }

    return nextErrors;
  }

  function handleChange(field: keyof DoctorFormValues, value: string | boolean) {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);

    const nextErrors = validate(nextValues);
    setErrors(nextErrors);
  }

  function handleBlur(field: keyof DoctorFormValues) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({
      name: true,
      crm: true,
      specialtyId: true,
      email: true,
      phone: true,
    });

    if (Object.keys(nextErrors).length > 0) return;

    await onSubmit(values);
  }

  const isEdit = mode === 'edit';

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formHeader}>
        <div>
          <h2 className={styles.formTitle}>
            {isEdit ? 'Editar médico' : 'Cadastrar médico'}
          </h2>
          <p className={styles.formSubtitle}>
            Preencha os dados do profissional para organizar a equipe e a agenda
            da clínica.
          </p>
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formField}>
          <label className={styles.fieldLabel} htmlFor="name">
            Nome completo
          </label>
          <Input
            id="name"
            value={values.name}
            onChange={(event) => handleChange('name', event.target.value)}
            onBlur={() => handleBlur('name')}
            placeholder="Digite o nome completo"
            hasError={!!errors.name && touched.name}
          />
          {errors.name && touched.name && (
            <p className={styles.fieldError}>{errors.name}</p>
          )}
        </div>

        <div className={styles.formField}>
          <label className={styles.fieldLabel} htmlFor="crm">
            CRM
          </label>
          <Input
            id="crm"
            value={values.crm}
            onChange={(event) => handleChange('crm', event.target.value)}
            onBlur={() => handleBlur('crm')}
            placeholder="Número do CRM"
            hasError={!!errors.crm && touched.crm}
          />
          {errors.crm && touched.crm && (
            <p className={styles.fieldError}>{errors.crm}</p>
          )}
        </div>

        <div className={styles.formField}>
          <label className={styles.fieldLabel} htmlFor="specialtyId">
            Especialidade
          </label>
          <Select
            id="specialtyId"
            value={values.specialtyId}
            onChange={(event) =>
              handleChange('specialtyId', event.target.value)
            }
            onBlur={() => handleBlur('specialtyId')}
            hasError={!!errors.specialtyId && touched.specialtyId}
          >
            <option value="">Selecione uma especialidade</option>
            {specialties.map((specialty) => (
              <option key={specialty.id} value={String(specialty.id)}>
                {specialty.name}
              </option>
            ))}
          </Select>
          {errors.specialtyId && touched.specialtyId && (
            <p className={styles.fieldError}>{errors.specialtyId}</p>
          )}
        </div>

        <div className={styles.formField}>
          <label className={styles.fieldLabel} htmlFor="email">
            E-mail
          </label>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(event) => handleChange('email', event.target.value)}
            onBlur={() => handleBlur('email')}
            placeholder="email@medico.com"
            hasError={!!errors.email && touched.email}
          />
          {errors.email && touched.email && (
            <p className={styles.fieldError}>{errors.email}</p>
          )}
        </div>

        <div className={styles.formField}>
          <label className={styles.fieldLabel} htmlFor="phone">
            Telefone
          </label>
          <Input
            id="phone"
            value={values.phone}
            onChange={(event) => handleChange('phone', event.target.value)}
            onBlur={() => handleBlur('phone')}
            placeholder="(00) 00000-0000"
            hasError={!!errors.phone && touched.phone}
          />
          {errors.phone && touched.phone && (
            <p className={styles.fieldError}>{errors.phone}</p>
          )}
        </div>

        <div className={styles.formFieldFull}>
          <label className={styles.fieldLabel} htmlFor="bio">
            Bio / apresentação (opcional)
          </label>
          <textarea
            id="bio"
            className={styles.textarea}
            value={values.bio ?? ''}
            onChange={(event) => handleChange('bio', event.target.value)}
            rows={4}
            placeholder="Resumo da experiência, área de atuação e forma de atendimento do médico."
          />
        </div>

        <div className={styles.formField}>
          <label className={styles.fieldLabel} htmlFor="isActive">
            Status do médico
          </label>
          <div className={styles.switchRow}>
            <button
              type="button"
              className={[
                styles.switchPill,
                values.isActive ? styles.switchPillActive : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleChange('isActive', true)}
            >
              Ativo
            </button>
            <button
              type="button"
              className={[
                styles.switchPill,
                !values.isActive ? styles.switchPillActive : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleChange('isActive', false)}
            >
              Inativo
            </button>
          </div>
        </div>
      </div>

      <div className={styles.formFooter}>
        <div className={styles.formFooterLeft}>
          <p className={styles.formHint}>
            Você poderá configurar a disponibilidade do médico em detalhes pela
            tela de agenda.
          </p>
        </div>
        <div className={styles.formFooterActions}>
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
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
                : 'Cadastrando...'
              : isEdit
              ? 'Salvar alterações'
              : 'Cadastrar médico'}
          </Button>
        </div>
      </div>
    </form>
  );
}
