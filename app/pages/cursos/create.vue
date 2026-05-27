<script setup lang="ts">
const { $api } = useNuxtApp()
const router = useRouter()

const form = reactive({
  nome: "",
  descricao: "",
  duracao: "",
})

async function submit() {
  await $api("/cursos", {
    method: "POST",
    body: form,
  })

  router.push("/cursos")
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Criar Curso</h1>

    <div class="card">
      <input v-model="form.nome" class="input mb-2" placeholder="Nome" />
      <input v-model="form.descricao" class="input mb-2" placeholder="Descrição" />
      <input v-model="form.duracao" class="input mb-4" placeholder="Duração (ex: 3 anos)" />

      <button class="btn-primary" @click="submit">
        Guardar
      </button>
    </div>
  </div>
</template>