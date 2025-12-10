// src/shared/layout/Topbar/Topbar.tsx

import type { ReactElement, FormEvent } from 'react';
import { useState } from 'react';
import { FiBell, FiSearch, FiLogOut } from 'react-icons/fi';

import { useAuth } from '../../../hooks/useAuth';
import { Avatar } from '../../../shared/ui/Avatar/Avatar';

import styles from './Topbar.module.css';

/**
 * Topbar do dashboard
 * - Campo de busca global (placeholder por enquanto)
 * - Área de usuário com nome, papel e avatar
 * - Botão de sair
 */
export function Topbar(): ReactElement {
  const { user, logout } = useAuth();
  const [search, setSearch] = useState('');

  const displayName =
    user?.displayName || user?.email || 'Profissional da clínica';

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();
    // Futuro: disparar busca global (consultas, pacientes, etc.)
  }

  async function handleLogout(): Promise<void> {
    try {
      await logout();
    } catch (error) {
      // Futuro: exibir toast de erro
      // eslint-disable-next-line no-console
      console.error('Erro ao sair:', error);
    }
  }

  return (
    <header className={styles.topbar}>
      {/* Coluna esquerda: busca global */}
      <div className={styles.left}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <span className={styles.searchIcon} aria-hidden="true">
            <FiSearch />
          </span>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Buscar consultas, pacientes, médicos..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Buscar no sistema"
          />
        </form>
      </div>

      {/* Coluna direita: ações e usuário */}
      <div className={styles.right}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Ver notificações"
        >
          <FiBell />
          <span className={styles.badgeDot} aria-hidden="true" />
        </button>

        <div className={styles.userArea}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{displayName}</span>
            <span className={styles.userRole}>Recepção / Administração</span>
          </div>

          <Avatar
            name={displayName}
            size="sm"
            status="online"
            className={styles.userAvatar}
          />

          <button
            type="button"
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            <FiLogOut className={styles.logoutIcon} />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
