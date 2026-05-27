<script setup lang="ts">
const { $api } = useNuxtApp()
const router = useRouter()

const form = reactive({
  nome: "",
  email: "",
})

async function submit() {
  await $api("/alunos", {
    method: "POST",
    body: form,
  })

  router.push("/alunos")
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Criar Aluno</h1>

    <div class="card">
      <input v-model="form.nome" class="input mb-2" placeholder="Nome" />
      <input v-model="form.email" class="input mb-4" placeholder="Email" />

      <button class="btn-primary" @click="submit">
        Guardar
      </button>
    </div>
  </div>
</template>