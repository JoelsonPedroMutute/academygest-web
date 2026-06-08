export default defineNuxtPlugin(async (nuxtApp) => {
  const { fetchUser } = useAuth();
  const store = useAuthStore();
  const token = useCookie("token");

  if (process.client) {
    nuxtApp.hook("app:mounted", () => {
      if (token.value && !store.token) {
        store.setToken(token.value);
        fetchUser();
      }
    });
  }
});
