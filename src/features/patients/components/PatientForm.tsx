// src/features/patients/components/PatientForm.tsx

import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { Input } from '../../../shared/ui/Input/Input';
import { Select } from '../../../shared/ui/Select/Select';
import { Button } from '../../../shared/ui/Button/Button';

import styles from '../styles/Patient.module.css';

export type PatientFormValues = {
  id?: string | number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  address: string;
  notes?: string;
  isActive: boolean;
};

type Mode = 'create' | 'edit';

type PatientFormProps = {
  mode: Mode;
  initialValues: PatientFormValues;
  onSubmit: (values: PatientFormValues) => Promise<void> | void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

export default function PatientForm({
  mode,
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting,
}: PatientFormProps) {
  const [values, setValues] = useState<PatientFormValues>(initialValues);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // hoje (para limitar data de nascimento no futuro)
  const todayISO = useMemo(
    () => new Date().toISOString().split('T')[0],
    [],
  );

  useEffect(() => {
    setValues(initialValues);
    setTouched({});
    setErrors({});
  }, [initialValues]);

  function normalizeValues(raw: PatientFormValues): PatientFormValues {
    return {
      ...raw,
      name: raw.name.trim(),
      cpf: raw.cpf.trim(),
      email: raw.email.trim(),
      phone: raw.phone.trim(),
      birthDate: raw.birthDate.trim(),
      address: raw.address.trim(),
      notes: raw.notes?.trim() || '',
    };
  }

  function validate(nextValues: PatientFormValues) {
    const v = normalizeValues(nextValues);
    const nextErrors: Record<string, string> = {};

    if (!v.name) {
      nextErrors.name = 'Informe o nome completo do paciente.';
    }

    if (!v.cpf) {
      nextErrors.cpf = 'Informe o CPF do paciente.';
    }

    if (!v.birthDate) {
      nextErrors.birthDate = 'Informe a data de nascimento.';
    }

    if (!v.email) {
      nextErrors.email = 'Informe um e-mail válido.';
    }

    if (!v.phone) {
      nextErrors.phone = 'Informe um telefone de contato.';
    }

    if (!v.address) {
      nextErrors.address = 'Informe o endereço principal do paciente.';
    }

    return nextErrors;
  }

  function handleChange(
    field: keyof PatientFormValues,
    value: string | boolean,
  ) {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);
    setErrors(validate(nextValues));
  }

  function handleBlur(field: keyof PatientFormValues) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const normalized = normalizeValues(values);
    setValues(normalized);

    const nextErrors = validate(normalized);
    setErrors(nextErrors);
    setTouched({
      name: true,
      cpf: true,
      birthDate: true,
      email: true,
      phone: true,
      address: true,
    });

    if (Object.keys(nextErrors).length > 0) return;

    await onSubmit(normalized);
  }

  const isEdit = mode === 'edit';

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formHeader}>
        <div>
          <h2 className={styles.formTitle}>
            {isEdit ? 'Editar paciente' : 'Cadastrar paciente'}
          </h2>
          <p className={styles.formSubtitle}>
            Preencha os dados do paciente para organizar a agenda e o
            prontuário.
          </p>
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formField}>
          <Input
            id="name"
            label="Nome completo"
            value={values.name}
            onChange={(event) => handleChange('name', event.target.value)}
            onBlur={() => handleBlur('name')}
            placeholder="Digite o nome completo"
            autoComplete="name"
            helperText="Use o nome completo como aparece nos documentos."
            error={touched.name ? errors.name : undefined}
          />
        </div>

        <div className={styles.formField}>
          <Input
            id="cpf"
            label="CPF"
            value={values.cpf}
            onChange={(event) => handleChange('cpf', event.target.value)}
            onBlur={() => handleBlur('cpf')}
            placeholder="000.000.000-00"
            autoComplete="off"
            helperText="Apenas números — a máscara pode ser aplicada depois."
            error={touched.cpf ? errors.cpf : undefined}
          />
        </div>

        <div className={styles.formField}>
          <Input
            id="birthDate"
            label="Data de nascimento"
            type="date"
            value={values.birthDate}
            onChange={(event) => handleChange('birthDate', event.target.value)}
            onBlur={() => handleBlur('birthDate')}
            max={todayISO}
            error={touched.birthDate ? errors.birthDate : undefined}
          />
        </div>

        <div className={styles.formField}>
          <Select
            id="gender"
            label="Gênero"
            value={values.gender}
            onChange={(event) => handleChange('gender', event.target.value)}
            onBlur={() => handleBlur('gender')}
            helperText="Essa informação ajuda no prontuário e na comunicação."
          >
            <option value="MALE">Masculino</option>
            <option value="FEMALE">Feminino</option>
            <option value="OTHER">Outro / Prefere não informar</option>
          </Select>
        </div>

        <div className={styles.formField}>
          <Input
            id="email"
            type="email"
            label="E-mail"
            value={values.email}
            onChange={(event) => handleChange('email', event.target.value)}
            onBlur={() => handleBlur('email')}
            placeholder="email@paciente.com"
            autoComplete="email"
            helperText="Usado para comunicações e lembretes de consulta."
            error={touched.email ? errors.email : undefined}
          />
        </div>

        <div className={styles.formField}>
          <Input
            id="phone"
            label="Telefone"
            value={values.phone}
            onChange={(event) => handleChange('phone', event.target.value)}
            onBlur={() => handleBlur('phone')}
            placeholder="(00) 00000-0000"
            autoComplete="tel"
            helperText="Telefone principal de contato do paciente."
            error={touched.phone ? errors.phone : undefined}
          />
        </div>

        <div className={styles.formFieldFull}>
          <Input
            id="address"
            label="Endereço"
            value={values.address}
            onChange={(event) => handleChange('address', event.target.value)}
            onBlur={() => handleBlur('address')}
            placeholder="Rua, número, bairro, cidade..."
            autoComplete="street-address"
            helperText="Endereço principal para correspondências e visitas."
            error={touched.address ? errors.address : undefined}
          />
        </div>

        <div className={styles.formFieldFull}>
          <label className={styles.fieldLabel} htmlFor="notes">
            Observações (opcional)
          </label>
          <textarea
            id="notes"
            className={styles.textarea}
            value={values.notes ?? ''}
            onChange={(event) => handleChange('notes', event.target.value)}
            rows={4}
            maxLength={1000}
            placeholder="Histórico, alergias, preferências de contato..."
          />
        </div>

        <div className={styles.formField}>
          <label className={styles.fieldLabel} htmlFor="isActive">
            Status do paciente
          </label>
          <div
            className={styles.switchRow}
            role="radiogroup"
            aria-label="Status do paciente"
          >
            <button
              type="button"
              className={[
                styles.switchPill,
                values.isActive ? styles.switchPillActive : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleChange('isActive', true)}
              aria-pressed={values.isActive}
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
              aria-pressed={!values.isActive}
            >
              Inativo
            </button>
          </div>
        </div>
      </div>

      <div className={styles.formFooter}>
        <div className={styles.formFooterLeft}>
          <p className={styles.formHint}>
            Você poderá registrar consultas e evoluções pelo histórico do
            paciente.
          </p>
        </div>
        <div className={styles.formFooterActions}>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            size="sm"
            tone="primary"
            variant="solid"
            disabled={isSubmitting}
            isLoading={Boolean(isSubmitting)}
          >
            {isSubmitting
              ? isEdit
                ? 'Salvando...'
                : 'Cadastrando...'
              : isEdit
              ? 'Salvar alterações'
              : 'Cadastrar paciente'}
          </Button>
        </div>
      </div>
    </form>
  );
}
