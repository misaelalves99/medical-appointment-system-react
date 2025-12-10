// src/shared/components/DataTable/DataTable.tsx

import type { ReactElement, ReactNode } from 'react';
import styles from './DataTable.module.css';

export type DataTableAlign = 'left' | 'center' | 'right';

export interface DataTableColumn<T> {
  /**
   * ID interno da coluna (versão antiga) — usado como key do header.
   */
  id?: string;
  /**
   * Chave de acesso no objeto ou identificador customizado
   * (versão mais nova).
   */
  key?: keyof T | string;
  /** Título exibido no header (versão antiga). */
  label?: string;
  /** Título exibido no header (versão nova). */
  header?: string;
  /** Campo da linha a ser exibido (quando não usar render). */
  accessor?: keyof T;
  /** Renderer custom para a célula (recebe linha inteira). */
  render?: (row: T) => ReactNode;
  /** Largura opcional (ex: "120px", "20%"). */
  width?: string;
  /** Alinhamento do conteúdo. */
  align?: DataTableAlign;
}

interface DataTableProps<T> {
  columns: Array<DataTableColumn<T>>;
  /** Versão antiga. */
  rows?: T[];
  /** Versão nova. */
  data?: T[];
  /** Estado de carregamento. */
  loading?: boolean;
  /** Mensagem quando não há dados. */
  emptyMessage?: string;
  /** Slot opcional acima da tabela (filtros, buscas, etc.). */
  toolbar?: ReactNode;
  /** Linha clicável. */
  onRowClick?: (row: T) => void;
  /**
   * Identificador único da linha.
   * Compat:
   *  - antigo: (row) => id
   *  - novo: (row, index) => id
   */
  getRowId?: (row: T, index?: number) => string | number;
}

/**
 * Tabela genérica reutilizável
 * - Unifica as duas versões anteriores
 * - Suporta:
 *   - columns com id/label/accessor (antigo) OU key/header (novo)
 *   - rows (antigo) ou data (novo)
 *   - loading, emptyMessage, toolbar, onRowClick
 */
export function DataTable<T>({
  columns,
  rows,
  data,
  loading = false,
  emptyMessage = 'Nenhum registro encontrado.',
  toolbar,
  onRowClick,
  getRowId,
}: DataTableProps<T>): ReactElement {
  const dataset = (data ?? rows ?? []) as T[];
  const hasData = dataset.length > 0;

  const wrapperClass =
    (styles as any).tableWrapper || (styles as any).dataTableWrapper || '';

  return (
    <div className={wrapperClass}>
      {toolbar && (styles as any).toolbar && (
        <div className={(styles as any).toolbar}>{toolbar}</div>
      )}

      <table className={styles.table}>
        <thead className={(styles as any).thead}>
          <tr>
            {columns.map((column) => {
              const headerLabel = column.header ?? column.label ?? '';
              const key =
                column.id ??
                (column.key ? String(column.key) : headerLabel || Math.random().toString());

              const alignClass =
                column.align != null
                  ? (styles as any)[`cell--${column.align}`]
                  : (styles as any)['cell--left'];

              return (
                <th
                  key={key}
                  className={`${(styles as any).headerCell ?? ''} ${alignClass ?? ''}`}
                  style={column.width ? { width: column.width } : undefined}
                  scope="col"
                >
                  {headerLabel}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className={(styles as any).tbody}>
          {loading && (
            <tr className={styles.row}>
              <td
                className={
                  (styles as any).loadingRow ?? (styles as any).emptyRow ?? ''
                }
                colSpan={columns.length}
              >
                {(styles as any).spinner && (
                  <div className={(styles as any).spinner} />
                )}
                <span>Carregando dados...</span>
              </td>
            </tr>
          )}

          {!loading && !hasData && (
            <tr className={styles.row}>
              <td
                className={
                  (styles as any).emptyRow ?? (styles as any).emptyCell ?? ''
                }
                colSpan={columns.length}
                aria-live="polite"
              >
                {emptyMessage}
              </td>
            </tr>
          )}

          {!loading &&
            hasData &&
            dataset.map((row, index) => {
              const id = getRowId ? getRowId(row, index) : index;
              const rowClass = onRowClick
                ? `${styles.row} ${(styles as any).rowInteractive ?? ''}`
                : styles.row;

              return (
                <tr
                  key={id}
                  className={rowClass}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {columns.map((column) => {
                    const content =
                      column.render != null
                        ? column.render(row)
                        : column.accessor
                          ? (row as any)[column.accessor]
                          : column.key
                            ? (row as any)[column.key as keyof T]
                            : null;

                    const alignClass =
                      column.align != null
                        ? (styles as any)[`cell--${column.align}`]
                        : (styles as any)['cell--left'];

                    return (
                      <td
                        key={
                          column.id ??
                          (column.key ? String(column.key) : String(Math.random()))
                        }
                        className={`${styles.cell} ${alignClass ?? ''}`}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
