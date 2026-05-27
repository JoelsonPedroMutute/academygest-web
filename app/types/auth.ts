export interface User {
  id: number;
  name: string;
  email: string;

  telefone?: string;
  endereco?: string;
  bi?: string;

  genero?: "M" | "F";

  role: "admin" | "docente" | "aluno";

  status: "active" | "inactive" | "pending" | "approved" | "rejected";

  created_at?: string;
  updated_at?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
