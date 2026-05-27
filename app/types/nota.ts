import type { Aluno } from "./aluno";

export interface Nota {
  id: number;

  aluno_id: number;
  disciplina_id: number;
  turma_id: number;

  prova_trimestral?: number;
  prova_semestral?: number;
  exame_final?: number;

  media_final?: number;

  situacao?: "aprovado" | "reprovado" | "recurso";

  aluno?: Aluno;

  created_at?: string;
  updated_at?: string;
}
