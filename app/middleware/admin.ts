export default defineNuxtRouteMiddleware(() => {
  const token = process.client ? localStorage.getItem("token") : null;
  const user = process.client
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null;

  if (!token) {
    return navigateTo("/login");
  }

  if (user?.role !== "admin") {
    return navigateTo("/unauthorized");
  }
});
