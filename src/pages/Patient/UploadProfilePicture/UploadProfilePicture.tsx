// src/pages/Patient/UploadProfilePicture/UploadProfilePicture.tsx

import React, { useState, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UploadProfilePicture.module.css";
import { usePatient } from "../../../hooks/usePatient";

const UploadProfilePicture: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { patients, updatePatientProfilePicture } = usePatient();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const patient = patients.find((p) => p.id === Number(id));

  if (!patient) {
    return (
      <div className={styles.uploadProfileContainer}>
        <h1>Upload de Foto de Perfil</h1>
        <p>Paciente não encontrado.</p>
        <button className={styles.back} onClick={() => navigate("/patient")}>
          Voltar
        </button>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    // Criamos uma URL local para simular a foto do paciente
    const imageUrl = URL.createObjectURL(selectedFile);
    updatePatientProfilePicture(patient.id, imageUrl);

    navigate("/patient");
  };

  return (
    <div className={styles.uploadProfileContainer}>
      <h1>Upload de Foto de Perfil</h1>

      <p>
        <strong>Nome:</strong> {patient.name}
      </p>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="hidden" name="id" value={patient.id} />

        <div>
          <label htmlFor="profilePicture">Selecionar Foto:</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
            required
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
