export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiBase,

    onRequest({ options }) {
      const token = import.meta.client ? localStorage.getItem("token") : null;

      if (token) {
        const headers = new Headers(options.headers);

        headers.set("Authorization", `Bearer ${token}`);

        options.headers = headers;
      }
    },

    onResponseError({ response }) {
      if (response.status === 401) {
        if (import.meta.client) {
          localStorage.removeItem("token");
          navigateTo("/login");
        }
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});
