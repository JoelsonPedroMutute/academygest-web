<script setup lang="ts">
type DocenteForm = {
  nome: string
  email: string
  especialidade: string
}

const { $api } = useNuxtApp()
const router = useRouter()

const form = reactive<DocenteForm>({
  nome: "",
  email: "",
  especialidade: "",
})

async function submit() {
  await $api("/docentes", {
    method: "POST",
    body: form,
  })

  router.push("/docentes")
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Criar Docente</h1>

    <div class="card">
      <input v-model="form.nome" class="input mb-2" placeholder="Nome" />
      <input v-model="form.email" class="input mb-2" placeholder="Email" />
      <input
        v-model="form.especialidade"
        class="input mb-4"
        placeholder="Especialidade"
      />

      <button class="btn-primary" @click="submit">
        Guardar
      </button>
    </div>
  </div>
</template>