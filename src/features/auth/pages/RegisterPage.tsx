// src/features/auth/pages/RegisterPage.tsx

import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthPages.module.css';

import { useAuth } from '../../../hooks/useAuth';
import { SocialButton } from '../../../features/auth/components/SocialButton/SocialButton';
import { Button } from '../../../shared/ui/Button/Button';
import { Input } from '../../../shared/ui/Input/Input';

export default function RegisterPage() {
  const {
    register,
    loginWithGoogle,
    loginWithFacebook,
    loading,
    error,
  } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!displayName || !email || !password) return;

    // ✅ Propriedades compatíveis com RegisterCredentials (displayName, email, password)
    await register({ displayName, email, password });
  }

  return (
    <div className={styles.page}>
      <div className={styles.glowTop} />
      <div className={styles.glowBottom} />

      <div className={styles.card}>
        <div className={styles.leftPanel}>
          <div className={styles.brand}>
            <div className={styles.brandLogo}>MS</div>
            <div className={styles.brandText}>
              <span className={styles.brandTitle}>Medical System</span>
              <span className={styles.brandSubtitle}>
                Agenda da sua clínica, em um só lugar
              </span>
            </div>
          </div>

          <h1 className={styles.title}>Crie sua conta em minutos</h1>
          <p className={styles.subtitle}>
            Configure o painel para organizar pacientes, médicos, especialidades
            e consultas sem planilhas soltas.
          </p>

          <div className={styles.highlights}>
            <div className={styles.highlightItem}>
              <span className={styles.highlightDot} />
              <span>Controle centralizado de agenda</span>
            </div>
            <div className={styles.highlightItem}>
              <span className={styles.highlightDot} />
              <span>Histórico de consultas por paciente</span>
            </div>
            <div className={styles.highlightItem}>
              <span className={styles.highlightDot} />
              <span>Painel moderno no padrão dos CRMs atuais</span>
            </div>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Criar conta</h2>
            <p className={styles.formSubtitle}>
              Informe seus dados básicos para acessar o painel administrativo.
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              label="Nome completo"
              placeholder="Seu nome"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />

            <Input
              label="E-mail"
              type="email"
              placeholder="seuemail@clinica.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Senha"
              type="password"
              placeholder="Crie uma senha segura"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className={styles.errorMessage}>{error}</p>}

            <div className={styles.actionsRow}>
              {/* ✅ Button com isLoading */}
              <Button type="submit" isLoading={loading} fullWidth>
                Criar conta e acessar
              </Button>
            </div>
          </form>

          <div className={styles.divider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerLabel}>ou use uma conta social</span>
            <span className={styles.dividerLine} />
          </div>

          <div className={styles.socialRow}>
            <SocialButton
              provider="google"
              onClick={loginWithGoogle}
              disabled={loading}
            />
            <SocialButton
              provider="facebook"
              onClick={loginWithFacebook}
              disabled={loading}
            />
          </div>

          <p className={styles.switchAuth}>
            Já tem uma conta?{' '}
            <Link to="/auth/login" className={styles.switchAuthLink}>
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
