// src/features/auth/pages/LoginPage.tsx

import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthPages.module.css';

import { useAuth } from '../../../hooks/useAuth';
import { SocialButton } from '../../../features/auth/components/SocialButton/SocialButton';
import { Button } from '../../../shared/ui/Button/Button';
import { Input } from '../../../shared/ui/Input/Input';

export default function LoginPage() {
  const {
    login,
    loginWithGoogle,
    loginWithFacebook,
    loading,
    error,
  } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email || !password) return;

    // ✅ login recebe um objeto LoginCredentials
    await login({ email, password });
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
                Agenda médica unificada
              </span>
            </div>
          </div>

          <h1 className={styles.title}>Bem-vindo de volta 👋</h1>
          <p className={styles.subtitle}>
            Acesse o painel para gerenciar <strong>consultas</strong>,{' '}
            <strong>pacientes</strong> e <strong>médicos</strong> em um único
            lugar.
          </p>

          <div className={styles.highlights}>
            <div className={styles.highlightItem}>
              <span className={styles.highlightDot} />
              <span>Visão do dia com próximas consultas</span>
            </div>
            <div className={styles.highlightItem}>
              <span className={styles.highlightDot} />
              <span>Organização de especialidades e agenda médica</span>
            </div>
            <div className={styles.highlightItem}>
              <span className={styles.highlightDot} />
              <span>Histórico completo de pacientes</span>
            </div>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Login</h2>
            <p className={styles.formSubtitle}>
              Entre com seu e-mail e senha ou use uma conta social.
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
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
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className={styles.errorMessage}>{error}</p>}

            <div className={styles.actionsRow}>
              {/* ✅ Button usa isLoading em vez de loading */}
              <Button type="submit" isLoading={loading} fullWidth>
                Entrar no painel
              </Button>
            </div>
          </form>

          <div className={styles.divider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerLabel}>ou continue com</span>
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
            Ainda não tem conta?{' '}
            <Link to="/auth/register" className={styles.switchAuthLink}>
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
