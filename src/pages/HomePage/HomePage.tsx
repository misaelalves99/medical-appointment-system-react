// src/pages/HomePage/HomePage.tsx

import React from "react";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      <h1>Bem-vindo ao Sistema de Agendamento Médico</h1>

      <p>Escolha uma das opções abaixo:</p>

      <div className={styles.homeButtons}>
        <a href="/patient" className={styles.patientBtn}>Gerenciar Pacientes</a>
        <a href="/doctor" className={styles.doctorBtn}>Gerenciar Médicos</a>
        <a href="/specialty" className={styles.specialtyBtn}>Gerenciar Especialidades</a>
        <a href="/appointment" className={styles.appointmentBtn}>Gerenciar Consultas</a>
      </div>
    </div>
  );
};

export default HomePage;
