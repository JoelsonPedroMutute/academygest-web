import { defineStore } from "pinia";

export const useCursosStore = defineStore("cursos", {
  state: () => ({
    cursos: [] as any[],
    curso: null as any,
    loading: false,
  }),

  actions: {
    async fetchAll() {
      const config = useRuntimeConfig();

      const response: any = await $fetch(`${config.public.apiBase}/cursos`);

      this.cursos = response.data;
    },

    async create(data: any) {
      const config = useRuntimeConfig();

      await $fetch(`${config.public.apiBase}/cursos`, {
        method: "POST",
        body: data,
      });

      await this.fetchAll();
    },

    async update(id: number, data: any) {
      const config = useRuntimeConfig();

      await $fetch(`${config.public.apiBase}/cursos/${id}`, {
        method: "PUT",
        body: data,
      });

      await this.fetchAll();
    },

    async remove(id: number) {
      const config = useRuntimeConfig();

      await $fetch(`${config.public.apiBase}/cursos/${id}`, {
        method: "DELETE",
      });

      this.cursos = this.cursos.filter((curso) => curso.id !== id);
    },
  },
});
