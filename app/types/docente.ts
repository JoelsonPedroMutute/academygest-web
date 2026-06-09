import type { User } from "./auth";

export interface Docente {
  id: number;

  user_id: number;

  especialidade?: string;
  data_nascimento?: string;

  user?: User;

  created_at?: string;
  updated_at?: string;
}
