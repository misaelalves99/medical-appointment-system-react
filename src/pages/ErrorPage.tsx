// src/pages/ErrorPage.tsx

import type { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './ErrorPage.module.css';

type ErrorLocationState = {
  message?: string;
  stack?: string;
};

export default function ErrorPage(): ReactElement {
  const location = useLocation();
  const navigate = useNavigate();

  const state = (location.state ?? {}) as ErrorLocationState;

  const message =
    state.message ??
    'Ocorreu um erro inesperado ao carregar esta página.';

  const stack = state.stack;
  const routePath = location.pathname || '/';

  function handleGoDashboard() {
    navigate('/dashboard');
  }

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <div className={styles.iconBubble}>!</div>

          <div className={styles.titleGroup}>
            <h1 className={styles.title}>Algo deu errado</h1>
            <p className={styles.subtitle}>{message}</p>

            <div className={styles.routePill}>
              <span className={styles.routeLabel}>ROTA</span>
              <span className={styles.routeValue}>{routePath}</span>
            </div>
          </div>
        </header>

        {stack && (
          <pre
            className={styles.stack}
            aria-label="Detalhes técnicos do erro"
          >
            {stack}
          </pre>
        )}

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleGoDashboard}
          >
            Voltar para o dashboard
          </button>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleGoBack}
          >
            Voltar para a página anterior
          </button>
        </div>
      </div>
    </div>
  );
}
