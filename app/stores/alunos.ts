import { defineStore } from "pinia";

export const useAlunosStore = defineStore("alunos", {
  state: () => ({
    alunos: [] as any[],
    aluno: null as any,
    loading: false,
  }),

  actions: {
    async fetchAll() {
      this.loading = true;

      const config = useRuntimeConfig();

      try {
        const response: any = await $fetch(`${config.public.apiBase}/alunos`);

        this.alunos = response.data;
      } finally {
        this.loading = false;
      }
    },

    async fetchOne(id: number) {
      const config = useRuntimeConfig();

      const response: any = await $fetch(
        `${config.public.apiBase}/alunos/${id}`,
      );

      this.aluno = response.data;
    },

    async create(data: any) {
      const config = useRuntimeConfig();

      await $fetch(`${config.public.apiBase}/alunos`, {
        method: "POST",
        body: data,
      });

      await this.fetchAll();
    },

    async update(id: number, data: any) {
      const config = useRuntimeConfig();

      await $fetch(`${config.public.apiBase}/alunos/${id}`, {
        method: "PUT",
        body: data,
      });

      await this.fetchAll();
    },

    async remove(id: number) {
      const config = useRuntimeConfig();

      await $fetch(`${config.public.apiBase}/alunos/${id}`, {
        method: "DELETE",
      });

      this.alunos = this.alunos.filter((aluno) => aluno.id !== id);
    },
  },
});
