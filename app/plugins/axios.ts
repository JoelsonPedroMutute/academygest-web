export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiBase,

    onRequest({ options }) {
      const token = useCookie("token").value;

      if (token) {
        const headers = new Headers(options.headers);

        headers.set("Authorization", `Bearer ${token}`);

        options.headers = headers;
      }
    },

    onResponseError({ response }) {
      if (response.status === 401) {
        useCookie("token").value = null;
        navigateTo("/login");
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});
