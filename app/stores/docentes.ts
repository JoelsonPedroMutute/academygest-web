import { defineStore } from "pinia";

export const useDocentesStore = defineStore("docentes", {
  state: () => ({
    docentes: [] as any[],
    docente: null as any,
    loading: false,
  }),

  actions: {
    async fetchAll() {
      this.loading = true;

      const config = useRuntimeConfig();

      try {
        const response: any = await $fetch(`${config.public.apiBase}/docentes`);

        this.docentes = response.data;
      } finally {
        this.loading = false;
      }
    },

    async fetchOne(id: number) {
      const config = useRuntimeConfig();

      const response: any = await $fetch(
        `${config.public.apiBase}/docentes/${id}`,
      );

      this.docente = response.data;
    },

    async create(data: any) {
      const config = useRuntimeConfig();

      await $fetch(`${config.public.apiBase}/docentes`, {
        method: "POST",
        body: data,
      });

      await this.fetchAll();
    },

    async update(id: number, data: any) {
      const config = useRuntimeConfig();

      await $fetch(`${config.public.apiBase}/docentes/${id}`, {
        method: "PUT",
        body: data,
      });

      await this.fetchAll();
    },

    async remove(id: number) {
      const config = useRuntimeConfig();

      await $fetch(`${config.public.apiBase}/docentes/${id}`, {
        method: "DELETE",
      });

      this.docentes = this.docentes.filter((docente) => docente.id !== id);
    },
  },
});
