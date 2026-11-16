/**
 * RF04 — Modelo de um instrumento coletivo (ACT ou CCT).
 */
export type StatusAcordo = 'Vigente' | 'Em negociação';

export interface Acordo {
  id: number;
  tipo: 'ACT' | 'CCT';
  titulo: string;        // título / empresa
  vigencia: string;      // ex.: 2025/2026
  status: StatusAcordo;
  clausulas: string[];   // cláusulas principais (reajuste, vale-alimentação, etc.)
}
