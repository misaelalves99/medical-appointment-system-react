// src/components/Error.tsx

import React from "react";
import { Link } from "react-router-dom";
import styles from "./Error.module.css";

const Error: React.FC = () => {
  return (
    <div className={styles.errorContainer}>
      <h1>Ocorreu um erro</h1>
      <p>Desculpe, ocorreu um erro ao processar sua solicitação.</p>
      <Link to="/">Voltar para a Home</Link>
    </div>
  );
};

export default Error;
