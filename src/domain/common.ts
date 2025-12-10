// src/domain/common.ts

export type ID = string;

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type Weekday =
  | 'SUNDAY'
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY';

export interface BaseEntity {
  id: ID;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export type Maybe<T> = T | null | undefined;

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
