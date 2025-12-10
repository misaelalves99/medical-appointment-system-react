// src/features/patients/components/UploadProfilePictureForm.tsx

import { FormEvent, useRef, useState } from 'react';

import { Button } from '../../../shared/ui/Button/Button';
import { Avatar } from '../../../shared/ui/Avatar/Avatar';

import styles from '../styles/Patient.module.css';

type UploadProfilePictureFormProps = {
  currentImageUrl?: string | null;
  patientName?: string | null;
  onSubmit: (file: File) => Promise<void> | void;
  onCancel: () => void;
};

export default function UploadProfilePictureForm({
  currentImageUrl,
  patientName,
  onSubmit,
  onCancel,
}: UploadProfilePictureFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl ?? null,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setSelectedFile(null);
      setPreviewUrl(currentImageUrl ?? null);
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!selectedFile) return;

    setSubmitting(true);
    try {
      await onSubmit(selectedFile);
    } finally {
      setSubmitting(false);
    }
  }

  function handleChooseFileClick() {
    fileInputRef.current?.click();
  }

  return (
    <form className={styles.uploadForm} onSubmit={handleSubmit}>
      <div className={styles.uploadHeader}>
        <div className={styles.uploadHeaderLeft}>
          <h2 className={styles.formTitle}>Foto do paciente</h2>
          <p className={styles.formSubtitle}>
            Envie uma foto nítida para facilitar a identificação do paciente na
            agenda e durante o atendimento. Essa imagem será exibida em listas,
            detalhes do paciente e tela de histórico.
          </p>
        </div>
      </div>

      <div className={styles.uploadGrid}>
        <div className={styles.uploadPreviewCard}>
          <div className={styles.uploadPreview}>
            <Avatar
              name={patientName ?? 'Paciente'}
              src={previewUrl ?? undefined}
              size="xl"
            />
            <p className={styles.uploadPreviewLabel}>
              Pré-visualização da foto
            </p>
            {currentImageUrl && !selectedFile && (
              <p className={styles.uploadPreviewBadge}>
                Usando foto atual do paciente
              </p>
            )}
          </div>
        </div>

        <div className={styles.uploadControlsCard}>
          <div className={styles.uploadControls}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.uploadInputHidden}
            />

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleChooseFileClick}
            >
              Escolher arquivo
            </Button>

            {selectedFile && (
              <p className={styles.uploadFileName}>
                Arquivo selecionado: <strong>{selectedFile.name}</strong>
              </p>
            )}

            <p className={styles.uploadHint}>
              Formatos suportados: JPG, PNG, WEBP. Tamanho recomendado:
              <br />
              <span className={styles.uploadHintEmphasis}>400x400px</span> e
              até <span className={styles.uploadHintEmphasis}>2MB</span>.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.formFooter}>
        <div className={styles.formFooterLeft}>
          <p className={styles.formHint}>
            A foto será usada apenas dentro do sistema, para facilitar a
            identificação visual do paciente e melhorar a experiência da equipe.
          </p>
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
            disabled={!selectedFile || submitting}
          >
            {submitting ? 'Salvando...' : 'Salvar foto'}
          </Button>
        </div>
      </div>
    </form>
  );
}
