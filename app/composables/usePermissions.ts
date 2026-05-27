export const usePermissions = () => {
  const { role } = useAuth();

  const isAdmin = computed(() => role.value === "admin");
  const isDocente = computed(() => role.value === "docente");
  const isAluno = computed(() => role.value === "aluno");

  const can = (roles: string[]) =>
    computed(() => roles.includes(role.value ?? ""));

  return { isAdmin, isDocente, isAluno, can };
};
