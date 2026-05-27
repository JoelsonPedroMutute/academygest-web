export const APP_NAME = "AcademyGest";

export const USER_ROLES = {
  ADMIN: "admin",
  DOCENTE: "docente",
  ALUNO: "aluno",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const API_ENDPOINTS = {
  AUTH: "/auth",
  USERS: "/users",
  ALUNOS: "/alunos",
  DOCENTES: "/docentes",
  CURSOS: "/cursos",
  TURMAS: "/turmas",
  NOTAS: "/notas",
};

export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
};
