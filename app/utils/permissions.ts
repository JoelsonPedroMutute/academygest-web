import { USER_ROLES, type UserRole } from "./constants";

export function canAccess(role: UserRole, allowedRoles: UserRole[]) {
  return allowedRoles.includes(role);
}

export function isAdmin(role: UserRole) {
  return role === USER_ROLES.ADMIN;
}

export function isDocente(role: UserRole) {
  return role === USER_ROLES.DOCENTE;
}

export function isAluno(role: UserRole) {
  return role === USER_ROLES.ALUNO;
}
