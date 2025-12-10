// src/hooks/useSidebar.ts

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'medical-dashboard:sidebar-collapsed';

export interface UseSidebarResult {
  isCollapsed: boolean;
  // nomes antigos
  toggleSidebar: () => void;
  collapse: () => void;
  expand: () => void;
  // aliases novos (caso alguma parte do código use)
  toggle: () => void;
  open: () => void;
  close: () => void;
}

/**
 * Hook para controlar o estado de collapse/expand da sidebar,
 * com:
 * - Persistência em localStorage
 * - Comportamento responsivo inicial (colapsa em < 1024px)
 * - Safe para SSR (checa typeof window)
 */
export function useSidebar(): UseSidebarResult {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        return stored === 'true';
      }

      // Sem valor salvo → colapsa em telas menores (ex: < 1024px)
      return window.innerWidth < 1024;
    } catch {
      return false;
    }
  });

  // Persiste sempre que mudar
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      window.localStorage.setItem(STORAGE_KEY, String(isCollapsed));
    } catch {
      // ignore
    }
  }, [isCollapsed]);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
  const collapse = () => setIsCollapsed(true);
  const expand = () => setIsCollapsed(false);

  // aliases para compatibilidade com o outro formato
  const toggle = toggleSidebar;
  const open = expand;
  const close = collapse;

  return {
    isCollapsed,
    toggleSidebar,
    collapse,
    expand,
    toggle,
    open,
    close,
  };
}
