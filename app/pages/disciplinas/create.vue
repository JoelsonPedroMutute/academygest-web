<script setup lang="ts">
definePageMeta({ layout: "admin", middleware: "auth" })

const { $api } = useNuxtApp()
const router = useRouter()
const { success, error } = useToast()

const form = reactive<any>({
  nome: "",
  descricao: "",
  curso_id: null,
})

const { data: res } = await useAsyncData("cursos-disciplinas", () =>
  $api("/admin/cursos")
)

const cursos = computed<any[]>(() => (res.value as any)?.data ?? res.value ?? [])

async function submit() {
  try {
    await $api("/admin/disciplinas", {
      method: "POST",
      body: form,
    })

    success("Disciplina criada com sucesso.")
    router.push("/disciplinas")
  } catch (e: any) {
    error("Erro ao criar disciplina.")
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Criar Disciplina</h1>

    <div class="card">
      <input v-model="form.nome" class="input mb-2" placeholder="Nome" />

      <textarea
        v-model="form.descricao"
        class="input mb-2"
        placeholder="Descrição"
      />

      <select v-model="form.curso_id" class="input mb-4">
        <option :value="null">Selecionar Curso</option>

        <option v-for="c in cursos" :key="c.id" :value="c.id">
          {{ c.nome }}
        </option>
      </select>

      <button class="btn-primary" @click="submit">
        Guardar
      </button>
    </div>
  </div>
</template>
