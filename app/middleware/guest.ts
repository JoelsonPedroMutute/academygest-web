export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated, role } = useAuth();

  if (isAuthenticated.value) {
    if (role.value === "admin") {
      return navigateTo("/dashboard/admin");
    } else if (role.value === "docente") {
      return navigateTo("/dashboard/docente");
    } else {
      return navigateTo("/dashboard/aluno");
    }
  }
});
