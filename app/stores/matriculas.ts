import { defineStore } from "pinia";

export const useMatriculasStore = defineStore("matriculas", {
  state: () => ({
    matriculas: [] as any[],
  }),

  actions: {
    async fetchAll() {
      const config = useRuntimeConfig();

      const response: any = await $fetch(`${config.public.apiBase}/matriculas`);

      this.matriculas = response.data;
    },
  },
});
