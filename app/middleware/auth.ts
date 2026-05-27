export default defineNuxtRouteMiddleware((to) => {
  const token = process.client ? localStorage.getItem("token") : null

  if (!token) {
    return navigateTo("/login")
  }
})