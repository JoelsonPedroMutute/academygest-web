import { defineStore } from "pinia";

export const useNotasStore = defineStore("notas", {
  state: () => ({
    notas: [] as any[],
  }),

  actions: {
    async fetchAll() {
      const config = useRuntimeConfig();

      const response: any = await $fetch(`${config.public.apiBase}/notas`);

      this.notas = response.data;
    },
  },
});
