import { defineStore } from 'pinia'

export const useDisciplinasStore = defineStore('disciplinas', {
  state: () => ({
    disciplinas: [] as any[]
  }),

  actions: {
    async fetchAll() {
      const config = useRuntimeConfig()

      const response: any = await $fetch(
        `${config.public.apiBase}/disciplinas`
      )

      this.disciplinas = response.data
    }
  }
})