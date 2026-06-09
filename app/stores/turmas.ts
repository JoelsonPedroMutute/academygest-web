import { defineStore } from "pinia";

export const useTurmasStore = defineStore("turmas", {
  state: () => ({
    turmas: [] as any[],
    turma: null as any,
    loading: false,
  }),

  actions: {
    async fetchAll() {
      const config = useRuntimeConfig();

      const response: any = await $fetch(`${config.public.apiBase}/turmas`);

      this.turmas = response.data;
    },

    async create(data: any) {
      const config = useRuntimeConfig();

      await $fetch(`${config.public.apiBase}/turmas`, {
        method: "POST",
        body: data,
      });

      await this.fetchAll();
    },

    async remove(id: number) {
      const config = useRuntimeConfig();

      await $fetch(`${config.public.apiBase}/turmas/${id}`, {
        method: "DELETE",
      });

      this.turmas = this.turmas.filter((turma) => turma.id !== id);
    },
  },
});
