// src/features/specialties/components/SpecialtyForm.tsx

import { FormEvent, useEffect, useState } from 'react';

import { Input } from '../../../shared/ui/Input/Input';
import { Button } from '../../../shared/ui/Button/Button';

import styles from '../styles/Specialty.module.css';

export type SpecialtyFormValues = {
  id?: string | number;
  name: string;
  description: string;
  isActive: boolean;
};

type Mode = 'create' | 'edit';

type SpecialtyFormProps = {
  mode: Mode;
  initialValues: SpecialtyFormValues;
  onSubmit: (values: SpecialtyFormValues) => Promise<void> | void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

export default function SpecialtyForm({
  mode,
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting,
}: SpecialtyFormProps) {
  const [values, setValues] = useState<SpecialtyFormValues>(initialValues);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  function validate(nextValues: SpecialtyFormValues) {
    const nextErrors: Record<string, string> = {};

    if (!nextValues.name.trim()) {
      nextErrors.name = 'Informe o nome da especialidade.';
    }

    return nextErrors;
  }

  function handleChange(
    field: keyof SpecialtyFormValues,
    value: string | boolean,
  ) {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);

    const nextErrors = validate(nextValues);
    setErrors(nextErrors);
  }

  function handleBlur(field: keyof SpecialtyFormValues) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({
      name: true,
      description: true,
      isActive: true,
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
            {isEdit ? 'Editar especialidade' : 'Cadastrar especialidade'}
          </h2>
          <p className={styles.formSubtitle}>
            Defina o nome e a descrição da especialidade para padronizar o
            cadastro de consultas.
          </p>
        </div>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.formField}>
          <label className={styles.fieldLabel} htmlFor="name">
            Nome da especialidade
          </label>
          <Input
            id="name"
            value={values.name}
            onChange={(event) => handleChange('name', event.target.value)}
            onBlur={() => handleBlur('name')}
            placeholder="Ex.: Cardiologia, Pediatria, Dermatologia..."
            hasError={!!errors.name && touched.name}
          />
          {errors.name && touched.name && (
            <p className={styles.fieldError}>{errors.name}</p>
          )}
        </div>

        <div className={styles.formFieldFull}>
          <label className={styles.fieldLabel} htmlFor="description">
            Descrição (opcional)
          </label>
          <textarea
            id="description"
            className={styles.textarea}
            value={values.description}
            onChange={(event) =>
              handleChange('description', event.target.value)
            }
            onBlur={() => handleBlur('description')}
            rows={4}
            placeholder="Inclua um breve resumo do tipo de atendimentos realizados nesta especialidade."
          />
        </div>

        <div className={styles.formField}>
          <label className={styles.fieldLabel} htmlFor="isActive">
            Status da especialidade
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
              Ativa
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
              Inativa
            </button>
          </div>
        </div>
      </div>

      <div className={styles.formFooter}>
        <div className={styles.formFooterLeft}>
          <p className={styles.formHint}>
            Especialidades inativas continuam no histórico, mas deixam de
            aparecer nos filtros principais de agendamento.
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
              : 'Cadastrar especialidade'}
          </Button>
        </div>
      </div>
    </form>
  );
}
