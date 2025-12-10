// src/shared/components/StatsCard/StatsCard.tsx

import type { ReactElement, ReactNode } from 'react';
import {
  FiUsers,
  FiCalendar,
  FiClock,
  FiUser,
  FiActivity,
} from 'react-icons/fi';
import styles from './StatsCard.module.css';

/**
 * Variantes visuais do card (cor/borda/fundo).
 * Compatível com:
 * - variant_default / variant_success...
 * - card_default / card_success...
 * - card--default / card--success...
 */
export type StatsCardVariant =
  | 'default'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info';

export type StatsTrendType = 'up' | 'down' | 'neutral';

/**
 * Chaves suportadas para ícones automáticos.
 * (usadas em DashboardStatsGrid: "users", "stethoscope", "calendar", "clock")
 */
type StatsIconKey = 'users' | 'stethoscope' | 'calendar' | 'clock' | 'activity';

interface StatsCardProps {
  label: string;
  value: string | number;

  /**
   * Texto auxiliar, ex.: "Hoje", "Últimos 7 dias".
   */
  helperText?: string;

  /**
   * Ícone opcional:
   * - ReactNode (ex: <FiUsers />)
   * - string (ex: "users", "calendar", "clock", "stethoscope")
   */
  icon?: ReactNode | StatsIconKey;

  /**
   * Variante visual principal.
   */
  variant?: StatsCardVariant;

  /**
   * Alias antigo ("tone").
   */
  tone?: StatsCardVariant;

  /**
   * Texto de tendência, ex.: "+12% vs semana passada".
   */
  trendLabel?: string;

  /**
   * Controle explícito da tendência.
   */
  trendType?: StatsTrendType;

  /**
   * Alias:
   * - true → tendência positiva
   * - false → negativa
   */
  trendIsPositive?: boolean;
}

/**
 * Converte chave de ícone string em um ícone do react-icons.
 * Se já vier um ReactNode, apenas retorna.
 */
function resolveIcon(icon?: ReactNode | StatsIconKey): ReactNode | null {
  if (!icon) return null;

  // Se já é ReactNode (ex: <FiUsers />), usa direto
  if (typeof icon !== 'string') {
    return icon;
  }

  // Se for string, mapeia para um ícone padrão
  switch (icon) {
    case 'users':
      return <FiUsers />;
    case 'stethoscope':
      return <FiUser />;
    case 'calendar':
      return <FiCalendar />;
    case 'clock':
      return <FiClock />;
    case 'activity':
    default:
      return <FiActivity />;
  }
}

/**
 * Card de métricas do dashboard (home, overview, etc.)
 * - mantém compat com suas 3 versões antigas
 * - adiciona ícones automáticos (react-icons) a partir de string
 */
export function StatsCard({
  label,
  value,
  helperText,
  icon,
  variant,
  tone,
  trendLabel,
  trendType,
  trendIsPositive,
}: StatsCardProps): ReactElement {
  const finalVariant: StatsCardVariant = variant ?? tone ?? 'default';

  const effectiveTrendType: StatsTrendType =
    trendType ??
    (typeof trendIsPositive === 'boolean'
      ? trendIsPositive
        ? 'up'
        : 'down'
      : 'neutral');

  const cardClassName = [
    // possíveis bases
    (styles as any).statsCardRoot,
    (styles as any).card,
    // variantes possíveis
    (styles as any)[`variant_${finalVariant}`],
    (styles as any)[`card_${finalVariant}`],
    (styles as any)[`card--${finalVariant}`],
  ]
    .filter(Boolean)
    .join(' ');

  const headerClass =
    (styles as any).header ?? (styles as any).headerRow ?? '';
  const labelClass = (styles as any).label ?? '';

  // agora usamos um círculo próprio para o ícone
  const iconWrapperClass =
    (styles as any).iconWrapper ??
    (styles as any).iconCircle ??
    (styles as any).icon ??
    '';

  const valueRowClass =
    (styles as any).valueRow ?? (styles as any).valueRow ?? '';
  const valueClass = (styles as any).value ?? '';
  const helperTextClass =
    (styles as any).helperText ?? (styles as any).helper ?? '';
  const footerClass =
    (styles as any).footer ?? (styles as any).trend ?? '';
  const trendBaseClass =
    (styles as any).trend ?? (styles as any).trendText ?? '';
  const trendVariantClass =
    effectiveTrendType === 'up'
      ? (styles as any).trendPositive ??
        (styles as any)['trend--up'] ??
        ''
      : effectiveTrendType === 'down'
      ? (styles as any).trendNegative ??
        (styles as any)['trend--down'] ??
        ''
      : (styles as any)['trend--neutral'] ?? '';
  const trendDotClass = (styles as any).trendDot ?? '';
  const trendTextClass =
    (styles as any).trendText ?? (styles as any).trendLabel ?? '';

  const showTrend = Boolean(trendLabel);
  const resolvedIcon = resolveIcon(icon);

  return (
    <article className={cardClassName}>
      <div className={headerClass}>
        <span className={labelClass}>{label}</span>
        {resolvedIcon && (
          <div className={iconWrapperClass} aria-hidden="true">
            {resolvedIcon}
          </div>
        )}
      </div>

      <div className={valueRowClass}>
        <span className={valueClass}>{value}</span>
      </div>

      {(helperText || showTrend) && (
        <div className={footerClass}>
          {helperText && <span className={helperTextClass}>{helperText}</span>}

          {showTrend && (
            <span className={`${trendBaseClass} ${trendVariantClass}`.trim()}>
              {trendDotClass && <span className={trendDotClass} />}
              <span className={trendTextClass}>{trendLabel}</span>
            </span>
          )}
        </div>
      )}
    </article>
  );
}

export default StatsCard;
