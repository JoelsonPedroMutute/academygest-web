import type { Curso } from "./curso";

export interface Turma {
  id: number;

  curso_id: number;

  nome: string;

  ano_letivo?: string;
  semestre?: string;

  capacidade?: number;

  turno?: "Manha" | "Tarde" | "Noite";

  curso?: Curso;

  created_at?: string;
  updated_at?: string;
}
