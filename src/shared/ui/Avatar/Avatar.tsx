// src/shared/ui/Avatar/Avatar.tsx

import type { ReactElement, ImgHTMLAttributes } from 'react';
import { useMemo } from 'react';
import styles from './Avatar.module.css';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarStatus = 'none' | 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  /**
   * URL da imagem do avatar
   */
  src?: string;
  /**
   * Nome da pessoa (usado para fallback de iniciais)
   */
  name?: string;
  /**
   * Texto alternativo para acessibilidade
   */
  alt?: string;
  /**
   * Tamanho do avatar
   */
  size?: AvatarSize;
  /**
   * Status exibido no canto (online, offline, etc.)
   */
  status?: AvatarStatus;
  /**
   * Se true, força mostrar apenas as iniciais (ignora src)
   */
  fallbackOnly?: boolean;
}

function getInitials(name?: string): string {
  if (!name) return '';
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase();
  return (
    parts[0]!.charAt(0).toUpperCase() +
    parts[parts.length - 1]!.charAt(0).toUpperCase()
  );
}

export function Avatar({
  src,
  name,
  alt,
  size = 'md',
  status = 'none',
  fallbackOnly = false,
  className,
  ...imgProps
}: AvatarProps): ReactElement {
  const initials = useMemo(() => getInitials(name), [name]);

  const rootClassName = [
    styles.avatarRoot,
    styles[`size_${size}`],
    status !== 'none' && styles.hasStatus,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const statusClassName =
    status !== 'none'
      ? [styles.status, styles[`status_${status}`]]
          .filter(Boolean)
          .join(' ')
      : undefined;

  const shouldShowImage = Boolean(src && !fallbackOnly);

  return (
    <span className={rootClassName} aria-label={alt ?? name}>
      {shouldShowImage ? (
        <img
          src={src}
          alt={alt ?? name ?? 'Avatar'}
          className={styles.image}
          {...imgProps}
        />
      ) : (
        <span className={styles.fallback} aria-hidden="true">
          {initials || '?'}
        </span>
      )}

      {status !== 'none' && <span className={statusClassName} />}
    </span>
  );
}
