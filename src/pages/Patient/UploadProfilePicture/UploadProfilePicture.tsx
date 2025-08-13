// src/pages/Patient/UploadProfilePicture/UploadProfilePicture.tsx

import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UploadProfilePicture.module.css";

interface UploadProfilePictureProps {
  patientId: number;
  patientName: string;
  onUpload: (file: File) => void;
}

const UploadProfilePicture: React.FC<UploadProfilePictureProps> = ({
  patientId,
  patientName,
  onUpload,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className={styles.uploadProfileContainer}>
      <h1>Upload de Foto de Perfil do Paciente</h1>

      <p>
        <strong>Nome:</strong> {patientName}
      </p>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="hidden" name="id" value={patientId} />
        <div>
          <label htmlFor="profilePicture">Selecionar Foto:</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" disabled={!selectedFile}>
          Enviar Foto
        </button>
      </form>

      <button className={styles.back} onClick={() => navigate("/patient")}>
        Voltar
      </button>
    </div>
  );
};

export default UploadProfilePicture;
