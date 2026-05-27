export default defineNuxtRouteMiddleware(() => {
  const token = process.client ? localStorage.getItem("token") : null;

  if (token) {
    return navigateTo("/dashboard");
  }
});
