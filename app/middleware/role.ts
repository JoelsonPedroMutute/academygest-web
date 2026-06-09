export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated.value) {
    return navigateTo("/login");
  }

  const allowedRoles = to.meta.roles as string[] | undefined;

  if (allowedRoles && !allowedRoles.includes(role.value as string)) {
    return navigateTo("/unauthorized");
  }
});
