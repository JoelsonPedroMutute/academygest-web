import type { User } from "./auth";
import type { Turma } from "./turma";

export interface Aluno {
  id: number;

  user_id: number;
  turma_id?: number;

  numero_estudante?: string;

  data_nascimento?: string;

  user?: User;
  turma?: Turma;

  created_at?: string;
  updated_at?: string;
}
