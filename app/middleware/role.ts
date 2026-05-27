export default defineNuxtRouteMiddleware((to) => {
  const token = process.client ? localStorage.getItem("token") : null;
  const user = process.client
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null;

  if (!token) {
    return navigateTo("/login");
  }

  const allowedRoles = to.meta.roles as string[] | undefined;

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return navigateTo("/unauthorized");
  }
});
